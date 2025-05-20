import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaginaInicial() {
  const [modelo, setmodelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [cpf, setCpf] = useState("");

  const router = useRouter();

  const cadastrarMoto = async () => {
    
    if (modelo && placa && cpf) {
      const novaMoto = { modelo, placa, cpf };
  
      try {
        const motosSalvas = await AsyncStorage.getItem('@listaMotos');
        const listaMotos = motosSalvas ? JSON.parse(motosSalvas) : [];
        listaMotos.push(novaMoto);
        await AsyncStorage.setItem('@listaMotos', JSON.stringify(listaMotos));
        router.push("/mottu");
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar a moto.");
      }
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre a sua Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo da moto"
        placeholderTextColor="#000000"
        value={modelo}
        onChangeText={nome => setmodelo(nome)}
      />

      <TextInput
        style={styles.input}
        placeholder="Placa da moto"
        placeholderTextColor="#000000"
        value={placa}
        onChangeText={plate => setPlaca(plate)}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF do dono"
        placeholderTextColor="#000000"
        keyboardType="numeric"
        value={cpf}
        onChangeText={cpf => setCpf(cpf)}
        maxLength={11}
      />

      <TouchableOpacity style={styles.button} onPress={cadastrarMoto}>
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#168821",
  },
  input: {
    borderWidth: 1,
    borderColor: "#168821",
    backgroundColor: "##000000",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    color: "#168821",
  },
  button: {
    backgroundColor: "#168821",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
