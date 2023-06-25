// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7giKfvvIpsXs1amk6Ld8OZvvSn-rsCHg",
  authDomain: "origameauth.firebaseapp.com",
  projectId: "origameauth",
  storageBucket: "origameauth.appspot.com",
  messagingSenderId: "261973738773",
  appId: "1:261973738773:web:824872c5ad72f74efe951c",
  measurementId: "G-SX1363L2L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);