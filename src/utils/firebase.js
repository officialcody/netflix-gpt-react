// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgfiFt9ubmwD2gx0t_YL95pfQzARYUuE0",
  authDomain: "netflixgpt-a5279.firebaseapp.com",
  projectId: "netflixgpt-a5279",
  storageBucket: "netflixgpt-a5279.appspot.com",
  messagingSenderId: "974434564548",
  appId: "1:974434564548:web:c8d521ff53890050500c91",
  measurementId: "G-3DEBJDZZZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
