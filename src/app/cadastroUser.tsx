import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "../contexts/ThemeContext";
import { createUser } from "../api/auth";
import { useTranslation } from 'react-i18next';

export default function CadastroUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useThemeContext();
  const router = useRouter();
  const { t } = useTranslation();

  const handleCadastroUser = async () => {
  if (email && password) {
    const isValidEmail = /\S+@\S+\.\S+/;
    if (!isValidEmail.test(email)) {
      Alert.alert(t('cadastro.errors.invalidEmail'));
      return;
    }

    try {
      await createUser(email, password, router);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert(t('cadastro.errors.emailAlreadyRegistered'));
      } else if (error.message === "Network Error") {
        Alert.alert(t('cadastro.errors.networkError'));
      } else {
        Alert.alert(t('cadastro.errors.unexpectedError'));
      }
    }
  } else {
    if (!email) {
      Alert.alert(t('cadastro.errors.emailRequired'));
    } else {
      Alert.alert(t('cadastro.errors.passwordRequired'));
    }
  }
};
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/logo_mottu.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>{t('cadastro.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('cadastro.emailPlaceholder')}
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder={t('cadastro.passwordPlaceholder')}
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastroUser}>
        <Text style={styles.buttonText}>{t('cadastro.registerButton')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>{t('cadastro.alreadyHaveAccount')}</Text>
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
