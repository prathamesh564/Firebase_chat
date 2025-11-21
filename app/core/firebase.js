"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQLgiNC77ufvTk87zlGL3MI5R-vmmDbZo",
  authDomain: "skill-6a798.firebaseapp.com",
  projectId: "skill-6a798",
  storageBucket: "skill-6a798.firebasestorage.app",
  messagingSenderId: "201644874931",
  appId: "1:201644874931:web:5c4bf3d8a68e493fe8a4c6",
  measurementId: "G-GY62N92CTZ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase analytics not initialized:", err.message || err);
  }
}222