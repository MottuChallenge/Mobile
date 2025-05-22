import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image} from "react-native";
import { Link, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaMottu() {
  const [moto, setMoto] = useState<{ modelo: string; placa: string; cpf: string } | null>(null);
  
  useFocusEffect(
    useCallback(() => {
      const carregarMoto = async () => {
        try {
          const motoString: string | null = await AsyncStorage.getItem('@listaMotos');
          if (motoString) {
            const listaMotos: [] = JSON.parse(motoString);
            const ultimaMoto = listaMotos[listaMotos.length - 1];
            setMoto(ultimaMoto);
          }
        } catch (error) {
          console.error('Erro ao recuperar dados', error);
        }
      };

      carregarMoto();
    }, [])
  );

  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {moto ? (
        <>
          <Text style={styles.title}>Moto cadastrada!</Text>
          <Text style={styles.info}>Nome da Moto: {moto.modelo}</Text>
          <Text style={styles.info}>Placa: {moto.placa}</Text>
          <Text style={styles.info}>CPF do Dono: {moto.cpf}</Text>
        </>
      ) : (
        <Text style={styles.noData}>SEM DADOS</Text>
      )}

      <Link href="/listamotos" asChild>
        <Button title="Ir p/ Lista de Motos" color="#32CD32" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#7CFC00",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  noData: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },logo: {
    width: 60,
    height: 70,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 10, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});
