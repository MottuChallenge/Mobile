import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeContext } from "../contexts/ThemeContext";
import { Sector } from "../api/interfaces/isetoresApi";
import { createSetoresApi } from "../api/factory/apiFactory";

export default function PatiosSetores() {
  const { id } = useLocalSearchParams() as { id?: string };
  const router = useRouter();
  const { colors } = useThemeContext();

  const [loading, setLoading] = useState(true);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const setoresApi = useMemo(() => createSetoresApi(), []);
  useEffect(() => {
    //if (!id) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const data = await setoresApi.findSetores(id);
        console.log(data);
        
        if (mounted) setSectors(data);
      } catch (err: any) {
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [id, setoresApi]);

  const allPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (const s of sectors) {
      const poi = s.pointsOfInterest;
      if (poi?.length) pts.push(...poi.map((p) => ({ x: p.x, y: p.y })));
      else if (s.spots?.length) pts.push(...s.spots.map((sp) => ({ x: sp.x, y: sp.y })));
    }
    return pts;
  }, [sectors]);

  const bounds = useMemo(() => {
    if (!allPoints.length) return null;
    const xs = allPoints.map((p) => p.x);
    const ys = allPoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    return { minX, minY, maxX, maxY };
  }, [allPoints]);

  const padding = 16;
  const scaleInfo = useMemo(() => {
    if (!bounds || canvasSize.width === 0 || canvasSize.height === 0) return null;
    const worldW = bounds.maxX - bounds.minX;
    const worldH = bounds.maxY - bounds.minY;
    const availW = Math.max(10, canvasSize.width - padding * 2);
    const availH = Math.max(10, canvasSize.height - padding * 2);
    const scale = Math.min(availW / worldW, availH / worldH);
    const offsetX = padding - bounds.minX * scale + (availW - worldW * scale) / 2;
    const offsetY = padding - bounds.minY * scale + (availH - worldH * scale) / 2;
    return { scale, offsetX, offsetY };
  }, [bounds, canvasSize]);

  const transformPoint = (x: number, y: number) => {
    if (!scaleInfo) return { left: 0, top: 0 };
    return {
      left: x * scaleInfo.scale + scaleInfo.offsetX,
      top: y * scaleInfo.scale + scaleInfo.offsetY,
    };
  };

  if (loading)
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.button} />
        <Text style={{ color: colors.text, marginTop: 8 }}>Carregando setores...</Text>
      </View>
    );

  if (error)
    return (
      <View style={[styles.center, { flex: 1, padding: 16, backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Erro: {error}</Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mapa de Setores</Text>

      <View
        style={styles.canvas}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setCanvasSize({ width, height });
        }}
      >
        {sectors.map((s) => {
          const poi = s.pointsOfInterest;
          if (poi && poi.length > 0 && scaleInfo) {
            const orderedPts = poi
              .slice()
              .sort((a, b) => (a.pointOrder ?? 0) - (b.pointOrder ?? 0))
              .map((p) => ({
                x: p.x * scaleInfo.scale + scaleInfo.offsetX,
                y: p.y * scaleInfo.scale + scaleInfo.offsetY,
              }));

            const edges = orderedPts.map((p, i) => {
              const next = orderedPts[(i + 1) % orderedPts.length];
              const dx = next.x - p.x;
              const dy = next.y - p.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
              return (
                <View
                  key={`edge-${s.id}-${i}`}
                  style={{
                    position: "absolute",
                    left: p.x,
                    top: p.y,
                    width: Math.max(1, len),
                    height: 2,
                    backgroundColor: "rgba(52,152,219,0.9)",
                    transform: [{ rotate: `${ang}deg` }],
                    transformOrigin: "0 0",
                  }}
                />
              );
            });

            const center = orderedPts.reduce(
              (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
              { x: 0, y: 0 }
            );
            center.x = center.x / orderedPts.length;
            center.y = center.y / orderedPts.length;

            return (
              <View key={s.id} style={{ position: "absolute", left: 0, top: 0 }}>
                {edges}
                {orderedPts.map((p, i) => (
                  <View key={`pt-${s.id}-${i}`} style={[styles.poiDot, { left: p.x - 4, top: p.y - 4 }]} />
                ))}
                <View
                  style={[
                    styles.sectorLabelContainer,
                    { left: orderedPts[0].x + 6, top: orderedPts[0].y - 6 },
                  ]}
                >
                  <Text style={styles.sectorLabel}>{s.id}</Text>
                </View>

                {/* Make the whole sector area pressable: cover polygon bbox with a transparent TouchableOpacity */}
                {(() => {
                  const xs = orderedPts.map((p) => p.x);
                  const ys = orderedPts.map((p) => p.y);
                  const minX = Math.min(...xs);
                  const minY = Math.min(...ys);
                  const maxX = Math.max(...xs);
                  const maxY = Math.max(...ys);
                  const width = Math.max(1, maxX - minX);
                  const height = Math.max(1, maxY - minY);
                  return (
                    <TouchableOpacity
                      accessibilityLabel={`Abrir setor ${s.id}`}
                      onPress={() => router.push(`/setorSpots?yardId=${id}&sectorId=${s.id}`)}
                      style={{ position: 'absolute', left: minX, top: minY, width, height, backgroundColor: 'transparent' }}
                    />
                  );
                })()}

                {/* Render spots (if any) and color by status */}
                {s.spots && s.spots.length > 0 && scaleInfo
                  ? s.spots.map((sp, i) => {
                      const sx = sp.x * scaleInfo.scale + scaleInfo.offsetX;
                      const sy = sp.y * scaleInfo.scale + scaleInfo.offsetY;
                      const occupied = sp.status === "ocupado";
                      return (
                        <View
                          key={`spot-${s.id}-${i}`}
                          accessibilityLabel={`Vaga ${sp.spotId} - ${sp.status}`}
                          style={[
                            styles.spotDot,
                            {
                              left: sx - 6,
                              top: sy - 6,
                              backgroundColor: occupied ? "#e74c3c" : "#2ecc71",
                              borderColor: "#fff",
                            },
                          ]}
                        />
                      );
                    })
                  : null}
              </View>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  center: { alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  canvas: {
    height: Math.round(Dimensions.get("window").height * 0.6),
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  poiDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3498db",
    borderWidth: 1,
    borderColor: "#fff",
  },
  sectorLabelContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sectorLabel: { fontSize: 10, color: "#3498db", fontWeight: "700" },
  // openButton removed: the whole sector is now pressable
  spotDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
});
