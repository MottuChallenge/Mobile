import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";

type Moto = {
  modelo: string;
  placa: string;
  cpf: string;
};

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const router = useRouter();

  const deletarMoto = async (placa: string) => {
    try {
      const novasMotos = motos.filter((moto) => moto.placa !== placa);
      setMotos(novasMotos);
      await AsyncStorage.setItem("@listaMotos", JSON.stringify(novasMotos));
    } catch (error) {
      console.error("Erro ao deletar moto:", error);
    }
  };

  const confirmarDeletarMoto = (placa: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Você tem certeza que deseja excluir esta moto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => deletarMoto(placa) },
      ]
    );
  };

  const limparLista = async () => {
    Alert.alert(
      "Confirmar limpeza",
      "Você tem certeza que deseja limpar toda a lista de motos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              setMotos([]);
              await AsyncStorage.removeItem("@listaMotos");
            } catch (error) {
              console.error("Erro ao limpar lista:", error);
            }
          },
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
              <Text style={styles.text}>🏍️ Nome: {item.modelo}</Text>
              <Text style={styles.text}>📄 Placa: {item.placa}</Text>
              <Text style={styles.text}>👤 CPF: {item.cpf}</Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmarDeletarMoto(item.placa)}
              >
                <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {motos.length > 0 && (
        <>
          <TouchableOpacity style={styles.clearButton} onPress={limparLista}>
            <Text style={styles.clearButtonText}>🧹 Limpar Lista</Text>
          </TouchableOpacity>

          {/* BOTÃO PARA IR PARA O PÁTIO */}
          <TouchableOpacity style={styles.patioButton} onPress={() => router.push("/patios")}>
            <Text style={styles.patioButtonText}>🚗 Ir para o Pátio</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#7CFC00",
  },
  item: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#7CFC00",
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  info: {
    textAlign: "center",
    color: "#888888",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: "#B22222",
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  clearButton: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: "#FFD700",
    borderRadius: 6,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  patioButton: {
    marginTop: 15,
    paddingVertical: 8,
    backgroundColor: "#1E90FF",
    borderRadius: 6,
    alignItems: "center",
  },
  patioButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
