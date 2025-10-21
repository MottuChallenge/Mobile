import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configurations/FirebaseConfig";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = (email, password, router) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      router.push('/listamotos');
    })
    .catch((error) => {
      const errorCode = error.code;
      
      let message = "Ocorreu um erro ao tentar cadastrar o usuário. Tente novamente.";

      if (errorCode === "auth/email-already-in-use") {
        message = "Este email já está cadastrado. Por favor, tente outro.";
      } else if (errorCode === "auth/invalid-email") {
        message = "O email informado não é válido. Verifique e tente novamente.";
      } else if (errorCode === "auth/weak-password") {
        message = "A senha deve ter pelo menos 6 caracteres.";
      }

      Alert.alert("Erro ao cadastrar", message);
    });
}

export const userLogin = (email, password, router) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      router.push('/index');
    })
    .catch((error) => {
      const errorCode = error.code;
      
      // Tratamento de erro mais específico para login
      let message = "Ocorreu um erro ao tentar fazer login. Tente novamente.";

      if (errorCode === "auth/wrong-password") {
        message = "A senha informada está incorreta. Tente novamente.";
      } else if (errorCode === "auth/user-not-found") {
        message = "Nenhum usuário encontrado com esse email. Verifique o email e tente novamente.";
      } else if (errorCode === "auth/invalid-email") {
        message = "O email informado não é válido. Verifique e tente novamente.";
      }

      Alert.alert("Erro ao fazer login", message);
    });
}
