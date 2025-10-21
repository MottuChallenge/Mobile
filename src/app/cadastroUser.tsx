import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "../contexts/ThemeContext";
import { createUser } from "../api/auth";

export default function CadastroUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useThemeContext();
  const router = useRouter();

  // Função para tratar cadastro de usuário
  const handleCadastroUser = async () => {
    if (email && password) {
      const isValidEmail = /\S+@\S+\.\S+/;
      if (!isValidEmail.test(email)) {
        Alert.alert("Erro", "Por favor, insira um email válido.");
        return;
      }

      try {
        await createUser(email, password, router);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Alert.alert("Erro", "Este email já está cadastrado.");
        } else if (error.message === "Network Error") {
          Alert.alert("Erro", "Erro de rede. Verifique sua conexão e tente novamente.");
        } else {
          Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
        }
      }
    } else {
      if (!email) {
        Alert.alert("Erro", "Preencha o campo de email.");
      } else {
        Alert.alert("Erro", "Preencha o campo de senha.");
      }
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

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Já tem uma conta? Entre agora</Text>
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
  loginText: {
    marginTop: 20,
    color: "#32CD32",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
