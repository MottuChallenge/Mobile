import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function PaginaInicial() {
  const [nomeMoto, setNomeMoto] = useState("");
  const [placa, setPlaca] = useState("");
  const [cpf, setCpf] = useState("");

  const router = useRouter();

  const cadastrarMoto = () => {
    if (nomeMoto && placa && cpf) {
      router.push({
        pathname: "/mottu",
        params: { nomeMoto, placa, cpf }
      });
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo, Cadastre a sua Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da moto"
        placeholderTextColor="#A3D9A5"
        value={nomeMoto}
        onChangeText={setNomeMoto}
      />

      <TextInput
        style={styles.input}
        placeholder="Placa da moto"
        placeholderTextColor="#A3D9A5"
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF do dono"
        placeholderTextColor="#A3D9A5"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
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
    backgroundColor: "#FFFFFF",
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
