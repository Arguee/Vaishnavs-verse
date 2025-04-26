// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Replace these values with YOUR own Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyBO5jBwNvKw04yID39A-NJO6G6YMK21iZU",
    authDomain: "poemhaven-99c36.firebaseapp.com",
    projectId: "poemhaven-99c36",
    storageBucket: "poemhaven-99c36.firebasestorage.app",
    messagingSenderId: "11879327224",
    appId: "1:11879327224:web:eb9a158c9fc6d0573c220d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export both the app and db instance
export { app, db };