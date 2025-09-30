import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "../theme/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser } from "../service/LoginService";

export default function CadastroUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useThemeContext();
  const router = useRouter();

  const handleCadastroUser = async () => {
    if (email && password) {
      createUser(email, password)
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/logo_mottu.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastroUser}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#32CD32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#32CD32",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    color: "#000",
  },
  button: {
    backgroundColor: "#32CD32",
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
  logo: {
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
  },
});
