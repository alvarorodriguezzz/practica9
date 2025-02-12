// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChFWbBgsMob718vk9X1CsKgLhJ2HRcfUU",
  authDomain: "practica9-af083.firebaseapp.com",
  databaseURL: "https://practica9-af083-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "practica9-af083",
  storageBucket: "practica9-af083.firebasestorage.app",
  messagingSenderId: "745699977423",
  appId: "1:745699977423:web:ceb09fec9dcb3fb5122fba"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const database = getDatabase(app); // Exportación nombrada