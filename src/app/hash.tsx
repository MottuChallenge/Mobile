import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function CommitPage() {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const commitHash = "6ef1423e1b5783e3c05f08e422d63d5ec387a567";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(commitHash);
    Alert.alert(t("commit.copied"));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("commit.title")}
      </Text>

      <Text style={[styles.hash, { color: colors.text }]}>
        {t("commit.hash")}
      </Text>

      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={[styles.commit, { color: colors.button }]}>
          {commitHash}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.tip, { color: colors.placeHolderTextColor }]}>
        {t("commit.tip")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  hash: {
    fontSize: 18,
  },
  commit: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  tip: {
    fontSize: 14,
    opacity: 0.6,
  },
});
