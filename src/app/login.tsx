import React, { useState, useRef } from "react";
import { ScrollView, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "../contexts/ThemeContext";
import { userLogin } from "../api/auth";
import { useTranslation } from 'react-i18next'; // Supondo que você use react-i18next

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useThemeContext();
  const router = useRouter();

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  // Função para tratar login
  const handleLogin = async () => {
    if (email && password) {
      const isValidEmail = /\S+@\S+\.\S+/;
      if (!isValidEmail.test(email)) {
        Alert.alert(t('login.errors.invalidEmail'));
        return;
      }

      setLoading(true);
      try {
        await userLogin(email, password, router);
        router.push('/listamotos');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Alert.alert(t('login.errors.credentialsIncorrect'));
        } else if (error.message === "Network Error") {
          Alert.alert(t('login.errors.networkError'));
        } else {
          Alert.alert(t('login.errors.unexpectedError'));
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (!email) emailInput.current.focus();
      else passwordInput.current.focus();
      Alert.alert(t('login.errors.fieldsRequired'));
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/logo_mottu.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>{t('login.title')}</Text>
      <TextInput
        ref={emailInput}
        style={styles.input}
        placeholder={t('login.emailPlaceholder')}
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email address input"
      />
      <TextInput
        ref={passwordInput}
        style={styles.input}
        placeholder={t('login.passwordPlaceholder')}
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? t('login.loading') : t('login.loginButton')}</Text>
      </TouchableOpacity>

      {/* Botão para redirecionar para a tela de cadastro */}
      <TouchableOpacity onPress={() => router.push('/cadastroUser')}>
        <Text style={styles.registerText}>{t('login.registerText')}</Text>
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
  registerText: {
    marginTop: 20,
    color: "#32CD32",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
