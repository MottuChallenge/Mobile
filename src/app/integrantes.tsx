import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useThemeContext } from "../contexts/ThemeContext";

const integrantes = [
  {
    nome: 'Pedro Henrique dos Santos',
    rm: '559064',
    github: 'https://github.com/Pedro-Henrique3216',
    imagem: 'https://avatars.githubusercontent.com/u/137585699?v=4',
  },
  {
    nome: 'Vinícius de Oliveira Coutinho',
    rm: '556182',
    github: 'https://github.com/ViniOC',
    imagem: 'https://avatars.githubusercontent.com/u/103922053?v=4',
  },
  {
    nome: 'Thiago Thomaz Sales Conceição',
    rm: '557992',
    github: "https://github.com/ThiagoThmaz",
    imagem: 'https://avatars.githubusercontent.com/u/142420181?v=4',
  }
];

export default function Integrantes() {
  const { colors } = useThemeContext()
  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}>

      {integrantes.map((integrante, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: integrante.imagem }} style={styles.imagem} />
          <Text style={styles.nome}>{integrante.nome}</Text>

          <View style={styles.links}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => Linking.openURL(integrante.github)}
            >
              <Text style={styles.textoBotao}>GitHub</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a', // fundo escuro para um contraste
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#66ff66', // verde claro para o título
  },
  card: {
    backgroundColor: '#333333', // fundo preto suave para os cartões
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#66ff66', 
  },
  nome: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#66ff66', 
  },
  links: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    backgroundColor: '#006400', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
