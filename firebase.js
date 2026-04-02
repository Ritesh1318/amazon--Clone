import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJUkqan1ukf4lf1w9Z8_1UWkNI3s5ipNo",
  authDomain: "clone-970b2.firebaseapp.com",
  projectId: "clone-970b2",
  storageBucket: "clone-970b2.firebasestorage.app",
  messagingSenderId: "937055640104",
  appId: "1:937055640104:web:fdcd2724544c2f06c6f31d",
  measurementId: "G-PYFT9T2FYE",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
