import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaMottu() {
  const [moto, setMoto] = useState<{ nomeMoto: string; placa: string; cpf: string } | null>(null);
  
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
      {moto ? (
        <>
          <Text style={styles.title}>Moto cadastrada!</Text>
          <Text style={styles.info}>Nome da Moto: {moto.nomeMoto}</Text>
          <Text style={styles.info}>Placa: {moto.placa}</Text>
          <Text style={styles.info}>CPF do Dono: {moto.cpf}</Text>
        </>
      ) : (
        <Text>SEM DADOS </Text>
      )}

      <Link href="/listamotos" asChild>
        <Button title="Ir p/ Lista de Motos" color="#168821" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F9EC",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#168821",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: "#2F5233",
    textAlign: "center",
  },
});
