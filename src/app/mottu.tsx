import React, { useCallback, useState } from "react";
import { Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface Moto {
  modelo: string;
  placa: string;
  cpf: string;
}

export default function TelaMottu() {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const [moto, setMoto] = useState<Moto | null>(null);

  useFocusEffect(
    useCallback(() => {
      const carregarMoto = async () => {
        try {
          const motoString: string | null = await AsyncStorage.getItem('@listaMotos');
          if (motoString) {
            const listaMotos: Moto[] = JSON.parse(motoString);
            const ultimaMoto = listaMotos[listaMotos.length - 1];
            setMoto(ultimaMoto);
          }
        } catch (error) {
          console.error('Erro ao recuperar dados', error);
        }
      };

      carregarMoto();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {moto ? (
        <>
          <Text style={styles.title}>{t("telaMottu.title")}</Text>
          <Text style={styles.info}>{t("telaMottu.labels.model")}: {moto.modelo}</Text>
          <Text style={styles.info}>{t("telaMottu.labels.plate")}: {moto.placa}</Text>
          <Text style={styles.info}>{t("telaMottu.labels.cpf")}: {moto.cpf}</Text>
        </>
      ) : (
        <Text style={styles.noData}>{t("telaMottu.noData")}</Text>
      )}

      <Link href="/listamotos" asChild>
        <Button title={t("telaMottu.goToListButton")} color="#32CD32" />
      </Link>
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
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#7CFC00",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  noData: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
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
  }
});
