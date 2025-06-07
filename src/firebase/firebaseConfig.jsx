// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"
import {signInWithPopup} from "firebase/auth" 
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBTSmLFd3Jf8KEaOxzFJlVNSvV-7T7AFd0",
  authDomain: "travel-d4acf.firebaseapp.com",
  projectId: "travel-d4acf",
  storageBucket: "travel-d4acf.firebasestorage.app",
  messagingSenderId: "1026654936314",
  appId: "1:1026654936314:web:316f2976f21c547f427d43",
  measurementId: "G-M3P6PZE29P"
};
 
  
const app = initializeApp(firebaseConfig);
// const fireDB = getFirestore(app)
const storage = getStorage(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider(); 
// const analytics = getAnalytics(app);
export {auth,storage, provider  , app, signInWithPopup}