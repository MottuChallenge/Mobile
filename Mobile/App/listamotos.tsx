import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

type Moto = {
  nomeMoto: string;
  placa: string;
  cpf: string;
};

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const dados = await AsyncStorage.getItem("@listaMotos");
          if (dados) {
            const listaMotos: Moto[] = JSON.parse(dados);
            console.log(listaMotos);
            
            setMotos(listaMotos);
          }
        } catch (error) {
          console.error("Erro ao carregar motos:", error);
        }
      };
  
      carregarMotos();
    }, [])
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Motos Cadastradas</Text>
      {motos.length === 0 ? (
        <Text style={styles.info}>Nenhuma moto cadastrada ainda.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>🏍️ Nome: {item.nomeMoto}</Text>
              <Text style={styles.text}>📄 Placa: {item.placa}</Text>
              <Text style={styles.text}>👤 CPF: {item.cpf}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F9EC",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#168821",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#168821",
  },
  text: {
    fontSize: 16,
    color: "#2F5233",
  },
  info: {
    textAlign: "center",
    color: "#777",
  },
});
