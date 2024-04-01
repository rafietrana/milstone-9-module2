// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMAG0zfsTGilUIov8hH72adj0aASYuNEs",
  authDomain: "login-email-password-7431f.firebaseapp.com",
  projectId: "login-email-password-7431f",
  storageBucket: "login-email-password-7431f.appspot.com",
  messagingSenderId: "774259732610",
  appId: "1:774259732610:web:18c503adc8763b6d1c849b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;