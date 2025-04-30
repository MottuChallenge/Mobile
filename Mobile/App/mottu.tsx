import { Link, useLocalSearchParams } from "expo-router";
import { Text, View,Button } from "react-native"
import { Drawer } from "expo-router/drawer";



export default function TelaMottu(){
    const{moto, placa}=useLocalSearchParams()
    return (
        <View>
            <Drawer.Screen name="mottu" options={{ title: "Mottu"}} />
            <Text>Aréa da Moto, Bem Vindo. Sua moto: {moto} com a Placa {placa}</Text>
            <Link href="/" asChild>
                 <Button title="Ir p/ Tela Inicial" />
            </Link>
        </View>
    )
}