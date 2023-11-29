// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrBOZMZIfN96qMCkIEiz2l8LOsti1d0xE",
  authDomain: "unity-admin-panel.firebaseapp.com",
  databaseURL: "https://unity-admin-panel-default-rtdb.firebaseio.com",
  projectId: "unity-admin-panel",
  storageBucket: "unity-admin-panel.appspot.com",
  messagingSenderId: "777712889321",
  appId: "1:777712889321:web:e55f425017891a63af6f78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)