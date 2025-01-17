// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG6-87gZxm0LYTz3oypMW0mCjovvyjCCg",
  authDomain: "list-of-tasks-cd3fd.firebaseapp.com",
  projectId: "list-of-tasks-cd3fd",
  storageBucket: "list-of-tasks-cd3fd.firebasestorage.app",
  messagingSenderId: "607280230158",
  appId: "1:607280230158:web:e37225dd235d8a339eb15f",
  measurementId: "G-5BY9PMR687"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
