import { Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from "../contexts/ThemeContext";
import ThemeToggleButton from '../components/ToggleButtonTheme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggleButton />
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={[styles.languageButton, { backgroundColor: '#32CD32' }]}
          onPress={() => setShowLangMenu(!showLangMenu)}
        >
          <Text style={styles.languageButtonText}>
            🌐 {t('home.selectLanguage')}
          </Text>
        </TouchableOpacity>

        {showLangMenu && (
          <View style={styles.languageMenu}>
            <TouchableOpacity onPress={() => changeLanguage('pt')} style={styles.langOption}>
              <Text style={styles.langText}>🇧🇷 Português</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.langOption}>
              <Text style={styles.langText}>🇺🇸 English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.langOption}>
              <Text style={styles.langText}>🇪🇸 Español</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

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
  languageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  languageButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageMenu: {
    marginTop: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  langOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  langText: {
    color: '#ADFF2F',
    fontSize: 16,
    textAlign: 'center',
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
