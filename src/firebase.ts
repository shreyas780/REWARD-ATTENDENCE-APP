// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbno9pjkGBCZrnhQtZ5eEO0kk0yVdwRGY",
  authDomain: "reward-attendence-app.firebaseapp.com",
  projectId: "reward-attendence-app",
  storageBucket: "reward-attendence-app.appspot.com",
  messagingSenderId: "518657827047",
  appId: "1:518657827047:web:d15e226f596c2c74164242",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);