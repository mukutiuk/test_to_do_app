import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT__APP__FIREBASE__API__KEY,
  authDomain: process.env.REACT__APP__FIREBASE__AUTH__DOMANIN,
  projectId: process.env.REACT__APP__FIREBASE__PROJECT__ID,
  storageBucket: process.env.REACT__APP__FIREBASE__STORAGE__BACKET,
  messagingSenderId:process.env.REACT__APP__FIREBASE__MESSAGING__SENDER__ID,
  appId: process.env.REACT__APP__FIREBASE__APP__ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);