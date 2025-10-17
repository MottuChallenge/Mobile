import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useThemeContext } from '../contexts/ThemeContext';
import { Sector, Spots } from '../api/interfaces/isetoresApi';
import { createSetoresApi } from '../api/factory/apiFactory';

export default function SetorSpots() {
  const { yardId, sectorId } = useLocalSearchParams() as { yardId?: string; sectorId?: string };
  const { colors } = useThemeContext();

  const [loading, setLoading] = useState(true);
  const [sector, setSector] = useState<Sector | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const setoresApi = useMemo(() => createSetoresApi(), []);

  useEffect(() => {
    //if (!sectorId) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const all = await setoresApi.findSetores(yardId || '');
        const found = all.find((s) => s.id === sectorId) || null;
        if (mounted) setSector(found);
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
  }, [yardId, sectorId]);

  const allPoints = useMemo(() => {
    if (!sector) return [];
    const pts: { x: number; y: number }[] = [];

    if (sector.pointsOfInterest?.length) {
      pts.push(...sector.pointsOfInterest.map((p) => ({ x: p.x, y: p.y })));
    } else if (sector.spots?.length) {
      pts.push(...sector.spots.map((sp) => ({ x: sp.x, y: sp.y })));
    }

    return pts;
  }, [sector]);

  const bounds = useMemo(() => {
    if (!allPoints.length) return null;

    let minX = Math.min(...allPoints.map((p) => p.x));
    let minY = Math.min(...allPoints.map((p) => p.y));
    let maxX = Math.max(...allPoints.map((p) => p.x));
    let maxY = Math.max(...allPoints.map((p) => p.y));

    // Evita divisão por zero
    if (minX === maxX) { minX -= 1; maxX += 1; }
    if (minY === maxY) { minY -= 1; maxY += 1; }

    return { minX, minY, maxX, maxY };
  }, [allPoints]);

  const padding = 12;
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
    return { left: x * scaleInfo.scale + scaleInfo.offsetX, top: y * scaleInfo.scale + scaleInfo.offsetY };
  };

  // 🚨 Loading
  if (loading)
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.button} />
        <Text style={{ color: colors.text, marginTop: 8 }}>Carregando setor...</Text>
      </View>
    );

  // ❌ Erro
  if (error)
    return (
      <View style={[styles.center, { flex: 1, padding: 16, backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Erro: {error}</Text>
      </View>
    );

  if (!sector)
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Setor não encontrado</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: colors.background }}>
      <Text style={[styles.title, { color: colors.text }]}>{sector.id}</Text>

      <View
        style={[styles.canvas, { backgroundColor: colors.input }]}
        onLayout={(e) => setCanvasSize(e.nativeEvent.layout)}
      >
        {/* 🔹 Desenha POIs */}
        {sector.pointsOfInterest?.length && scaleInfo &&
          sector.pointsOfInterest
            .slice()
            .sort((a, b) => (a.pointOrder ?? 0) - (b.pointOrder ?? 0))
            .map((p, i) => {
              const pos = transformPoint(p.x, p.y);
              return <View key={`poi-${i}`} style={[styles.poiDot, { left: pos.left - 4, top: pos.top - 4 }]} />;
            })
        }

        {/* 🔹 Desenha spots */}
        {sector.spots?.map((sp: Spots) => {
          const pos = transformPoint(sp.x, sp.y);
          // accept different status spellings from mocks / APIs
          const occupied = sp.status === 'ocupada' || sp.status === 'occupied' || sp.status === 'ocupado';
          const color = occupied ? '#e74c3c' : '#2ecc71';
          return (
            <View key={sp.spotId} style={[styles.spotWrapper, { left: pos.left - 12, top: pos.top - 20 }]}>
              <View style={[styles.spotRect, { backgroundColor: color }]}>
                {sp.motorcycleId ? (
                  <View style={styles.spotVerticalText}>
                    {String(sp.motorcycleId).split("").map((ch, idx) => (
                      <Text key={idx} style={styles.spotMotorcycleText}>{ch}</Text>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  canvas: { height: Math.round(Dimensions.get('window').height * 0.6), borderRadius: 8, overflow: 'hidden', position: 'relative' },
  poiDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#3498db', borderWidth: 1, borderColor: '#fff' },
  spotWrapper: { position: 'absolute' },
  spotRect: { width: 28, height: 56, borderWidth: 1, borderColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2 },
  spotMotorcycleText: { color: '#fff', fontSize: 12, fontWeight: '700', textAlign: 'center', lineHeight: 14 },
  spotVerticalText: { alignItems: 'center', justifyContent: 'center' },
});
