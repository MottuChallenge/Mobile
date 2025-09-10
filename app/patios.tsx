import React, { useRef, useState } from 'react';
import { View, StyleSheet, Platform, Text, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useThemeContext } from "../theme/ThemeContext";

const patios = [
  { id: 1, nome: 'Pátio Zona Sul', latitude: -23.61052, longitude: -46.633308, area: '1.200 m²', qtdMotos: 42 },
  { id: 2, nome: 'Pátio Zona Leste', latitude: -23.55052, longitude: -46.523308, area: '950 m²', qtdMotos: 30 },
  { id: 3, nome: 'Pátio Zona Norte', latitude: -23.48052, longitude: -46.633308, area: '1.500 m²', qtdMotos: 58 },
];

export default function Patios() {
  const { colors } = useThemeContext()
  const mapRef = useRef<MapView>(null);
  const [patioSelecionado, setPatioSelecionado] = useState<typeof patios[0] | null>(null);

  const handleSelecionarPatio = (patio: typeof patios[0]) => {
    setPatioSelecionado(patio);

    const region: Region = {
      latitude: patio.latitude,
      longitude: patio.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 1000);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, styles.darkBackground]}>
        <Text style={styles.darkText}>Mapa não disponível na versão web.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {patios.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            title={p.nome}
            pinColor={patioSelecionado?.id === p.id ? 'deepskyblue' : 'orange'}
          />
        ))}
      </MapView>

      {patioSelecionado && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitulo}>{patioSelecionado.nome}</Text>
          <Text style={styles.darkText}>Área: {patioSelecionado.area}</Text>
          <Text style={styles.darkText}>Quantidade de motos: {patioSelecionado.qtdMotos}</Text>
        </View>
      )}

      <View style={styles.listaContainer}>
        <FlatList
          data={patios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.patioItem,
                patioSelecionado?.id === item.id && { backgroundColor: '#2a394a' },
              ]}
              onPress={() => handleSelecionarPatio(item)}
            >
              <Text style={styles.patioNome}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#f0f0f0',
  },
  map: {
    flex: 2,
  },
  infoContainer: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  infoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#ffffff',
  },
  listaContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 8,
  },
  patioItem: {
    padding: 10,
    marginBottom: 6,
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  patioNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
