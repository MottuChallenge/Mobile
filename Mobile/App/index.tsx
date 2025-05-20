import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013220" />
      
      <Text style={styles.title}>Bem-vindo a Mottu</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('cadastro')}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#ADFF2F',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#98FB98',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00FF7F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#013220',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
