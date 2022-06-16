// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwDNVIR-B6KkWLETpf5h6N8KNl1cTEG8I",
  authDomain: "shared-canvas-f08f0.firebaseapp.com",
  projectId: "shared-canvas-f08f0",
  storageBucket: "shared-canvas-f08f0.appspot.com",
  messagingSenderId: "907154440494",
  appId: "1:907154440494:web:93cc5b3a106be423e13abf",
  measurementId: "G-2PQYZEM5KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
