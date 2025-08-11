// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbno9pjkGBCZrnhQtZ5eEO0kk0yVdwRGY",
  authDomain: "reward-attendence-app.firebaseapp.com",
  projectId: "reward-attendence-app",
  storageBucket: "reward-attendence-app.firebasestorage.app",
  messagingSenderId: "518657827047",
  appId: "1:518657827047:web:d15e226f596c2c74164242",
  measurementId: "G-EN9K7Q7LKF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
