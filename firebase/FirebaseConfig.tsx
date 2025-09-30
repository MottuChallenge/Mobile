// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgm7Du7OENiTfoWeObfbPMqcZnuD9PHiA",
  authDomain: "mobile-mottugrid.firebaseapp.com",
  projectId: "mobile-mottugrid",
  storageBucket: "mobile-mottugrid.firebasestorage.app",
  messagingSenderId: "228399736823",
  appId: "1:228399736823:web:a14fcea7c84cdcf63970f2",
  measurementId: "G-WYZBVSY6SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);