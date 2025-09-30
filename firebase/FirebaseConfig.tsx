import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { getReactNativePersistence } = require("firebase/auth") as any;



const firebaseConfig = {
  apiKey: "AIzaSyBgm7Du7OENiTfoWeObfbPMqcZnuD9PHiA",
  authDomain: "mobile-mottugrid.firebaseapp.com",
  projectId: "mobile-mottugrid",
  storageBucket: "mobile-mottugrid.firebasestorage.app",
  messagingSenderId: "228399736823",
  appId: "1:228399736823:web:a14fcea7c84cdcf63970f2",
  measurementId: "G-WYZBVSY6SG"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export { auth };