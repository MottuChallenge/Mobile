import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

type Moto = {
  nomeMoto: string;
  placa: string;
  cpf: string;
};

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);

  const deletarMoto = async (placa: string) => {
    try {
      const novasMotos = motos.filter((moto) => moto.placa !== placa);
      
      setMotos(novasMotos);

      await AsyncStorage.setItem("@listaMotos", JSON.stringify(novasMotos));

      console.log("Moto deletada com sucesso");
    } catch (error) {
      console.error("Erro ao deletar moto:", error);
    }
  };

  const confirmarDeletarMoto = (placa: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Você tem certeza que deseja excluir esta moto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletarMoto(placa),
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const dados = await AsyncStorage.getItem("@listaMotos");
          if (dados) {
            const listaMotos: Moto[] = JSON.parse(dados);
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

              {/* Botão para deletar */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmarDeletarMoto(item.placa)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
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
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
