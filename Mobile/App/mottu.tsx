import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";
import { Drawer } from "expo-router/drawer";

export default function TelaMottu() {
  const { nomeMoto, placa, cpf } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moto cadastrada!</Text>
      <Text style={styles.info}>Nome da Moto: {nomeMoto}</Text>
      <Text style={styles.info}>Placa: {placa}</Text>
      <Text style={styles.info}>CPF do Dono: {cpf}</Text>

      <Link href="/" asChild>
        <Button title="Ir p/ Tela Inicial" color="#168821" />
      </Link>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#168821",
    textAlign: "center",
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    color: "#2F5233",
    textAlign: "center",
  },
});
