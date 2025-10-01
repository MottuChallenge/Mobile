import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = (email, password, router) => {
    createUserWithEmailAndPassword(auth , email, password)
          .then(async(userCredential) => {
            const user = userCredential.user;
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            router.push('/listamotos');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(`Erro ${errorCode}`, `Erro ao cadastrar: ${errorMessage}`);
          });
}

export const userLogin = (email, password, router) =>  {
  signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      const user = userCredential.user
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      router.push("/index")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(`Erro ${errorCode}`, `Erro ao cadastrar: ${errorMessage}`);
    })
}