import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUm3ty0-d2UEoUPe3rbmZBBm_a5h1Eq9o",
  authDomain: "my-project-c591b.firebaseapp.com",
  projectId: "my-project-c591b",
  storageBucket: "my-project-c591b.firebasestorage.app",
  messagingSenderId: "782555854396",
  appId: "1:782555854396:web:85447a834e201ec499b539"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);