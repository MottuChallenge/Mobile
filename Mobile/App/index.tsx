import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router"


export default function PaginaInicial() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao MotoZone!</Text>
      <Text style={styles.subtitulo}>
        <Link href={{pathname:"/mottu", params:{moto:"Road Chopper 150", placa:"TJK4567"}}} asChild>
        <Button title="Ir p/ Tela Mottu"/>
        </Link>
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
  button: {
    fontSize: 16,
    color: "#e5e7eb", 
    textAlign: "center",
  }
});
