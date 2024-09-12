// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqbaZBek701RifQSPbfOU-_MkNjMNJ44c",
  authDomain: "fooder-9777b.firebaseapp.com",
  projectId: "fooder-9777b",
  storageBucket: "fooder-9777b.appspot.com",
  messagingSenderId: "1066155278856",
  appId: "1:1066155278856:web:b9c19a60014d849d9e47bd",
  measurementId: "G-9RD3NE7PGP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();