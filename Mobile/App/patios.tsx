import React from 'react';
import { View, StyleSheet, Platform, Text, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const patios = [
  {
    id: 1,
    nome: 'Pátio Zona Sul',
    latitude: -23.61052,
    longitude: -46.633308,
  },
  {
    id: 2,
    nome: 'Pátio Zona Leste',
    latitude: -23.55052,
    longitude: -46.523308,
  },
  {
    id: 3,
    nome: 'Pátio Zona Norte',
    latitude: -23.48052,
    longitude: -46.633308,
  },
];

export default function Patios() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text>Mapa não disponível na versão web.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MAPA */}
      <MapView
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
            description="Simulação de pátio"
          />
        ))}
      </MapView>

      {/* LISTA DE PÁTIOS */}
      <View style={styles.listaContainer}>
        <FlatList
          data={patios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.patioItem}>
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
  map: {
    flex: 2,
  },
  listaContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 8,
  },
  patioItem: {
    padding: 10,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  patioNome: {
    fontSize: 16,
    fontWeight: '500',
  },
});
