import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBd0K3tw3TLDExefzBwFhsMVO_Hpp8T41s",
  authDomain: "movie-reviews-final.firebaseapp.com",
  projectId: "movie-reviews-final",
  storageBucket: "movie-reviews-final.appspot.com",
  messagingSenderId: "930653607172",
  appId: "1:930653607172:web:d109fba5a85ad54f482c51",
  measurementId: "G-K0X4PMZS50",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
