import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeContext } from '../contexts/ThemeContext';
import { Sector, Spots } from '../api/interfaces/isetoresApi';
import { createSetoresApi } from '../api/factory/apiFactory';

export default function SetorSpots() {
  const { yardId, sectorId } = useLocalSearchParams() as { yardId?: string; sectorId?: string };
  const router = useRouter();
  const { colors } = useThemeContext();

  const [loading, setLoading] = useState(true);
  const [sector, setSector] = useState<Sector | null>(null);
  const [error, setError] = useState<string | null>(null);
  const setoresApi = useMemo(() => createSetoresApi(), []);

  useEffect(() => {
    if (!sectorId) return;
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const found = await setoresApi.findSetorById(sectorId);
        console.log(found);
        
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
  // prepare spots array for the grid view
  const spotsArray = useMemo(() => {
    if (!sector) return [] as Spots[];
    return sector.spots ?? [];
  }, [sector]);

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

  const total = spotsArray.length;
  const occupied = spotsArray.filter((s) => s.motorcycleId || s.status === 'ocupada' || s.status === 'occupied' || s.status === 'ocupado').length;

  const renderSpot = ({ item }: { item: Spots }) => {
    const occupiedSpot = item.motorcycleId || item.status === 'ocupada' || item.status === 'occupied' || item.status === 'ocupado';
    const bg = occupiedSpot ? '#e74c3c' : '#2ecc71';
    return (
      <TouchableOpacity
        style={[styles.spotCard, { backgroundColor: bg }]}
        onPress={() => Alert.alert(`Vaga ${item.spotId}`, item.motorcycleId ? `Moto: ${item.motorcycleId}` : 'Vaga livre')}
      >
        <Text style={styles.spotIdText}>{item.spotId}</Text>
        <Text style={styles.spotStatusText}>{occupiedSpot ? 'Ocupada' : 'Livre'}</Text>
        {item.motorcycleId ? <Text style={styles.spotMotoText}>{String(item.motorcycleId)}</Text> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 12 }}>
        <View style={[styles.header, { marginTop: 8 }]}> 
          <TouchableOpacity
            onPress={() => { console.log('back pressed'); router.navigate("patiosSetores"); }}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
          >
            <Text style={[styles.backText, { color: colors.text }]}>‹ Voltar</Text>
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: colors.text }]}>{sector.id}</Text>

          <View style={{ width: 64 }} />
        </View>

        <View style={[styles.summaryRow, { backgroundColor: colors.input }]}> 
          <Text style={[styles.summaryText, { color: colors.text }]}>Total: {total}</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>Ocupadas: {occupied}</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>Livres: {total - occupied}</Text>
        </View>

      {total === 0 ? (
        <View style={[styles.center, { flex: 1 }]}>
          <Text style={{ color: colors.text }}>Nenhuma vaga cadastrada neste setor</Text>
        </View>
      ) : (
        <FlatList
          data={spotsArray}
          keyExtractor={(i) => String(i.spotId)}
          renderItem={renderSpot}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          contentContainerStyle={{ paddingVertical: 12 }}
        />
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  canvas: { borderRadius: 8, overflow: 'hidden', position: 'relative' },
  poiDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#3498db', borderWidth: 1, borderColor: '#fff' },
  spotWrapper: { position: 'absolute' },
  spotRect: { width: 28, height: 56, borderWidth: 1, borderColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2 },
  spotMotorcycleText: { color: '#fff', fontSize: 12, fontWeight: '700', textAlign: 'center', lineHeight: 14 },
  spotVerticalText: { alignItems: 'center', justifyContent: 'center' },

  /* new styles for grid/list view */
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 8, marginVertical: 8 },
  summaryText: { fontSize: 14, fontWeight: '700' },
  // use a fixed percentage width so no card takes the whole row space
  spotCard: { width: '48%', minHeight: 84, borderRadius: 8, padding: 12, marginHorizontal: 0, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  spotIdText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  spotStatusText: { color: '#fff', fontSize: 12, marginTop: 6 },
  spotMotoText: { color: '#fff', fontSize: 14, marginTop: 4, fontWeight: '700' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { paddingHorizontal: 8, paddingVertical: 6 },
  backText: { fontSize: 14, fontWeight: '700' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
});
