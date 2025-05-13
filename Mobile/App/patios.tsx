import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from 'react-native'; 

export default function Patios(){
    return (
        <View style={styles.container}>
            <MapView
            style={styles.map}
            initialRegion={{
                latitude: -23.55052,
                longitude: -46.633308,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
           >
             <Marker
              coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
                 title="Pátio de São Paulo"
                 description="Exemplo de localização"
        />

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    map: {
        flex: 1
    }
})