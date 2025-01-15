// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwWkkKiAwHHzwl_g1Ve4OOx2e3knwZoFo",
  authDomain: "ark-map-app.firebaseapp.com",
  projectId: "ark-map-app",
  storageBucket: "ark-map-app.appspot.com", // Corrected this line
  messagingSenderId: "466408619800",
  appId: "1:466408619800:web:c81fb1c4f993602f2a286d",
  measurementId: "G-9K8W4TXFJ4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);