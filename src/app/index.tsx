import { Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from "../contexts/ThemeContext";
import ThemeToggleButton from '../components/ToggleButtonTheme';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggleButton />
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ADFF2F', marginBottom: 20 }]}
        onPress={() => {
          const nextLanguage =
            i18n.language === 'pt'
              ? 'en'
              : i18n.language === 'en'
                ? 'es'
                : 'pt';
          i18n.changeLanguage(nextLanguage);
        }}
      >
        <Text style={styles.buttonText}>
          {i18n.language === 'pt'
            ? 'Mudar para Inglês'
            : i18n.language === 'en'
              ? 'Cambiar a Español'
              : 'Switch to Portuguese'}
        </Text>
      </TouchableOpacity>F

      <Image
        source={require('../assets/moto.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      <Text style={styles.description}>{t('home.description')}</Text>

      <Image
        source={require('../assets/logo_mottu.png')}
        style={styles.logo_icon}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.buttonText}>{t('home.button')}</Text>
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
    color: '#32CD32',
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
