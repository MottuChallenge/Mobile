import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
        {/* Ícone da Moto */}
      <Image
        source={require('../assets/moto.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo à Mottu</Text>
      <Text style={styles.subtitle}>Mobilidade urbana com inovação e praticidade</Text>

      <Text style={styles.description}>
        A Mottu é uma startup que oferece aluguel de motos para entregadores e autônomos. Nosso
        objetivo é democratizar o acesso ao trabalho, fornecendo veículos confiáveis com manutenção
        garantida e suporte ao cliente. Aqui no app, você pode cadastrar-se, visualizar motos
        disponíveis, consultar pátios e saber mais sobre nossa equipe e missão.
      </Text>
      <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo_icon}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('cadastro')}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: '#32CD32',
    fontWeight: '900', 
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'System', 
  },
  subtitle: {
    fontSize: 20,
    color: '#ADFF2F',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'System',
  },
  description: {
    fontSize: 17,
    color: '#F0FFF0',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo_icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
});
