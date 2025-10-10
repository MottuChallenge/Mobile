import { useState } from "react";
import {Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView, Platform, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useThemeContext } from "../contexts/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMotorcycle, Motorcycle } from "../api/motos";
import { transformDateFormatToBR } from "../utils/transformDateFormatToBR";

export default function PaginaInicial() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [spotId, setSpotId] = useState(""); 
  const [lastRevisionDate, setLastRevisionDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [engineType, setEngineType] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useThemeContext();
  const router = useRouter();

  const verificarUsuario = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        Alert.alert("Erro", "Você precisa estar logado para cadastrar a moto.");
        router.push("/login"); 
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao verificar o usuário.");
      return false;
    }
  };

  const cadastrarMoto = async () => {
    if (!modelo || !placa) {
      Alert.alert("Erro", "Modelo e placa são obrigatórios.");
      return;
    }

    const usuarioAutenticado = await verificarUsuario(); 
    if (!usuarioAutenticado) return; 

    setLoading(true);

    try {
      let dataRevisao: string | null = null;
      if (lastRevisionDate && lastRevisionDate.trim() !== "") {
        dataRevisao = new Date(lastRevisionDate).toISOString();
      } else {
        dataRevisao = new Date(Date.now()).toISOString();
      }
      let spotIdMotorcycle: string | null = spotId;
      if(spotId && spotId.trim() === "") {
        spotIdMotorcycle = null;
      }
      const motorcycle: Motorcycle = {
        model: modelo,
        plate: placa,
        spotId: spotIdMotorcycle,
        lastRevisionDate: dataRevisao,
        engineType: engineType
      };

      await addMotorcycle(motorcycle);

      Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
      setModelo("");
      setPlaca("");
      setSpotId("");
      setLastRevisionDate("");
      setEngineType("");
      router.push("/mottu");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar a moto.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Registre a sua Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo da moto"
        placeholderTextColor="#000000"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa da moto (ABC-1234)"
        placeholderTextColor="#000000"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Spot ID (opcional)"
        placeholderTextColor="#000000"
        value={spotId}
        onChangeText={setSpotId}
      />
      <TouchableOpacity
        style={[styles.input, { justifyContent: 'center' }]}
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        {lastRevisionDate ? (
          <Text>{transformDateFormatToBR(lastRevisionDate)}</Text>
        ) : (
          <Text>Data da última revisão</Text>
        )}
      </TouchableOpacity>
      
      {showDatePicker && (
      
        <DateTimePicker
          value={lastRevisionDate ? new Date(lastRevisionDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              const yyyy = selectedDate.getFullYear();
              const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
              const dd = String(selectedDate.getDate() + 1).padStart(2, '0');
              setLastRevisionDate(`${yyyy}-${mm}-${dd}`);
            }
            setShowDatePicker(false);
          }}
        />     
      )}
      <View style={[styles.input, { padding: 0}]}>
        <Picker
          selectedValue={engineType}
          onValueChange={(value) => setEngineType(value)}
          style={{ color: '#000', width: '100%' }}
          itemStyle={{ color: '#000' }}
          mode="dropdown"
          dropdownIconColor="#32CD32"
        >
          <Picker.Item label="Combustão" value="0" />
          <Picker.Item label="Elétrico" value="1" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={cadastrarMoto} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar Moto"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center", color: "#32CD32" },
  input: { borderWidth: 1, borderColor: "#32CD32", backgroundColor: "#fff", padding: 12, marginBottom: 16, borderRadius: 8, color: "#000" },
  button: { backgroundColor: "#32CD32", paddingVertical: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  logo: { width: 60, height: 70, alignSelf: "center", marginBottom: 30, borderRadius: 10, elevation: 4 }
});
