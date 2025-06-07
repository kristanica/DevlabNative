// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDruPm73E34GFUq9dFIWDUgBI-gEEUZzf4",
  authDomain: "expo-firebase-devlab.firebaseapp.com",
  projectId: "expo-firebase-devlab",
  storageBucket: "expo-firebase-devlab.firebasestorage.app",
  messagingSenderId: "658438139501",
  appId: "1:658438139501:web:18a0f42e541218b052d964",
  measurementId: "G-V5D3YJDLLP",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
