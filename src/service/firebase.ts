// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMfSSz58oIkkbCf2FERKyY2ONBJtPaiYg",
  authDomain: "qr-paymemt-app.firebaseapp.com",
  projectId: "qr-paymemt-app",
  storageBucket: "qr-paymemt-app.appspot.com",
  messagingSenderId: "812233611219",
  appId: "1:812233611219:web:d4e7b9c341f1d2f4724126"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();