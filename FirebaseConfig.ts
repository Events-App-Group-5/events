// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA6cmLkejk-o8cpZ7FjDGsT01cP6y1B3jk",
  authDomain: "events-app-b2781.firebaseapp.com",
  projectId: "events-app-b2781",
  storageBucket: "events-app-b2781.firebasestorage.app",
  messagingSenderId: "473286733465",
  appId: "1:473286733465:web:33000939622bf98622d208",
  measurementId: "G-8LZG93THBW",
  databaseURL: "https://events-app-b2781-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, database };
