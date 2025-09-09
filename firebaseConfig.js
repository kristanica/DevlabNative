// Import the functions you need from the SDKs you need

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC61d0DTvZOQrBT9nzVjrsesekjZMYAUoE",
  authDomain: "devlab-b8a1e.firebaseapp.com",
  projectId: "devlab-b8a1e",
  storageBucket: "devlab-b8a1e.firebasestorage.app",
  messagingSenderId: "871275485475",
  appId: "1:871275485475:web:47b922283bf3e9d5a41496",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_STORE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
