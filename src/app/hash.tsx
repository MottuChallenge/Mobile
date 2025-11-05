import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useThemeContext } from "../contexts/ThemeContext";

export default function CommitPage() {
  const { colors } = useThemeContext();
  const commitHash = "a1b2c3d4e5f6g7h8i9j0";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(commitHash);
    Alert.alert("Hash copiado!");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Último Commit</Text>
      <Text style={[styles.hash, { color: colors.text }]}>Hash:</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={[styles.commit, { color: colors.button }]}>{commitHash}</Text>
      </TouchableOpacity>
      <Text style={[styles.tip, { color: colors.placeHolderTextColor }]}>
        Toque para copiar o hash
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  hash: { fontSize: 18 },
  commit: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  tip: { fontSize: 14, opacity: 0.6 },
});
