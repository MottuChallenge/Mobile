import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router"


export default function PaginaInicial() {
  return (
    <View>
      <Text>Bem-vindo ao MotoZone!</Text>
      <Text>
        <Link href={{pathname:"/mottu", params:{moto:"Road Chopper 150", placa:"TJK4567"}}} asChild>
        <Button title="Ir p/ Tela Mottu"/>
        </Link>
      </Text>
    </View>
  );
}

