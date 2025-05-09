// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
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
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = initializeAuth(app)
