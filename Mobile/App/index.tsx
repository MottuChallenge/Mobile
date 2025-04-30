import { View, Text, StyleSheet } from "react-native";

export default function PaginaInicial() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao MotoZone!</Text>
      <Text style={styles.subtitulo}>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#e5e7eb", 
    textAlign: "center",
  },
});
