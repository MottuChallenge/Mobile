import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeContext } from "../theme/ThemeContext";
import { useFocusEffect, useRouter } from "expo-router";
import { findMotorcycles } from "../service/DatabaseSevice";

// ---------- Tipo atualizado ----------
type Moto = {
  model: string;
  plate: string;
  cpf: string;
  spotId?: string;
  lastRevisionDate?: string;
};

export default function ListaMotos() {
  const { colors } = useThemeContext();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // ---------- Funções de manipulação ----------
  const deletarMoto = async (placa: string) => {
    try {
      const novasMotos = motos.filter((moto) => moto.plate !== placa);
      setMotos(novasMotos);
      await AsyncStorage.setItem("@listaMotos", JSON.stringify(novasMotos));
    } catch (error) {
      console.error("Erro ao deletar moto:", error);
    }
  };

  const confirmarDeletarMoto = (placa: string) =>
    Alert.alert("Confirmar exclusão", "Deseja excluir esta moto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deletarMoto(placa) },
    ]);

  const limparLista = () =>
    Alert.alert("Confirmar limpeza", "Deseja limpar toda a lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: async () => {
          setMotos([]);
          await AsyncStorage.removeItem("@listaMotos");
        },
      },
    ]);

  // ---------- Carregar motos do backend ----------
  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        setLoading(true);
        try {
          const lista = await findMotorcycles(1, 10);
          const motosFormatadas: Moto[] = lista.map((m: Moto) => ({
            modelo: m.model,
            placa: m.plate,
            cpf: m.cpf ?? "-",
            spotId: m.spotId ?? "-",
            lastRevisionDate: m.lastRevisionDate
              ? new Date(m.lastRevisionDate).toLocaleDateString()
              : "-",
          }));
          setMotos(motosFormatadas);
          await AsyncStorage.setItem("@listaMotos", JSON.stringify(motosFormatadas));
        } catch (error) {
          console.error("Erro ao carregar motos:", error);
        } finally {
          setLoading(false);
        }
      };
      carregarMotos();
    }, [])
  );

  // ---------- Componentes menores ----------
  const MotoItem = ({ moto }: { moto: Moto }) => (
    <View style={styles.item}>
      <Text style={styles.text}>🏍️ Modelo: {moto.model}</Text>
      <Text style={styles.text}>📄 Placa: {moto.plate}</Text>
      <Text style={styles.text}>👤 CPF: {moto.cpf}</Text>
      <Text style={styles.text}>📍 Spot ID: {moto.spotId}</Text>
      <Text style={styles.text}>🗓 Última Revisão: {moto.lastRevisionDate}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmarDeletarMoto(moto.plate)}
      >
        <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ActionButton = ({
    text,
    onPress,
    style,
    textStyle,
  }: {
    text: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
  }) => (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  // ---------- Render ----------
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Lista de Motos Cadastradas</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.input} />
      ) : motos.length === 0 ? (
        <Text style={styles.info}>Nenhuma moto cadastrada ainda.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.plate}
          renderItem={({ item }) => <MotoItem moto={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {!loading && motos.length > 0 && (
        <>
          <ActionButton
            text="🧹 Limpar Lista"
            onPress={limparLista}
            style={{ backgroundColor: "#FFD700", marginTop: 10 }}
            textStyle={{ color: "#000", fontWeight: "bold" }}
          />

          <ActionButton
            text="🚗 Ir para o Pátio"
            onPress={() => router.push("/patios")}
            style={{ backgroundColor: "#1E90FF", marginTop: 10 }}
          />
        </>
      )}
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#7CFC00",
  },
  item: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#7CFC00",
  },
  text: { fontSize: 16, color: "#FFF", marginBottom: 4 },
  info: { textAlign: "center", color: "#888", fontSize: 16 },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: "#B22222",
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: { color: "#FFF", fontSize: 16 },
  actionButton: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  actionButtonText: { fontSize: 16, color: "#FFF" },
});
