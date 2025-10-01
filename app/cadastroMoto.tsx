import { useState } from "react";
import {Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "../theme/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMotorcycle } from "../service/ApiService";

export default function PaginaInicial() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [spotId, setSpotId] = useState(""); 
  const [lastRevisionDate, setLastRevisionDate] = useState("");
  const [engineType, setEngineType] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useThemeContext();
  const router = useRouter();

  const verificarUsuario = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        Alert.alert("Erro", "Você precisa estar logado para cadastrar a moto.");
        router.push("/login"); 
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao verificar o usuário.");
      return false;
    }
  };

  const cadastrarMoto = async () => {
    if (!modelo || !placa) {
      Alert.alert("Erro", "Modelo e placa são obrigatórios.");
      return;
    }

    const usuarioAutenticado = await verificarUsuario(); 
    if (!usuarioAutenticado) return; 

    setLoading(true);
    try {
      // Preparar a data de revisão
      let dataRevisao: string | null = null;
      if (lastRevisionDate && lastRevisionDate.trim() !== "") {
        dataRevisao = new Date(lastRevisionDate).toISOString(); // Assumindo formato YYYY-MM-DD do input
      } else {
        dataRevisao = new Date(Date.now()).toISOString();
        console.log(dataRevisao);
      }
      await addMotorcycle(
        modelo,
        placa,
        dataRevisao,
        engineType ? Number(engineType) : 0
      );

      Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
      setModelo("");
      setPlaca("");
      setSpotId("");
      setLastRevisionDate("");
      setEngineType("");
      router.push("/mottu");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar a moto.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Registre a sua Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo da moto"
        placeholderTextColor="#000000"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa da moto"
        placeholderTextColor="#000000"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Spot ID (opcional)"
        placeholderTextColor="#000000"
        value={spotId}
        onChangeText={setSpotId}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da última revisão (aaaa-mm-dd) (opcional)"
        placeholderTextColor="#000000"
        value={lastRevisionDate}
        onChangeText={setLastRevisionDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de motor (0,1) (opcional)"
        placeholderTextColor="#000000"
        value={engineType}
        onChangeText={setEngineType}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={cadastrarMoto} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar Moto"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center", color: "#32CD32" },
  input: { borderWidth: 1, borderColor: "#32CD32", backgroundColor: "#fff", padding: 12, marginBottom: 16, borderRadius: 8, color: "#000" },
  button: { backgroundColor: "#32CD32", paddingVertical: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  logo: { width: 60, height: 70, alignSelf: "center", marginBottom: 30, borderRadius: 10, elevation: 4 }
});
