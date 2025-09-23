import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, addDoc, getDocs,doc,updateDoc,deleteDoc } from "firebase/firestore";

const { getReactNativePersistence } = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyCz5U7XdbmEpkMSXeuETOiRx_aVY9A5O5g",
  authDomain: "aulafirebaseauth-f3ddb.firebaseapp.com",
  projectId: "aulafirebaseauth-f3ddb",
  storageBucket: "aulafirebaseauth-f3ddb.firebasestorage.app",
  messagingSenderId: "995782312411",
  appId: "1:995782312411:web:830980d62fd0bfa31427fe"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app)

export { auth , db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc };