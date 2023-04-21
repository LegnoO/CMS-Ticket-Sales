/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMzk_-LppzTwOrXlMmjZkTmys8Wmu64Pc",
  authDomain: "first-project-b9c0e.firebaseapp.com",
  databaseURL: "https://first-project-b9c0e-default-rtdb.firebaseio.com",
  projectId: "first-project-b9c0e",
  storageBucket: "first-project-b9c0e.appspot.com",
  messagingSenderId: "766954088837",
  appId: "1:766954088837:web:956232eaf2a88e90b8fcec",
  measurementId: "G-RLNNPBHCCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
