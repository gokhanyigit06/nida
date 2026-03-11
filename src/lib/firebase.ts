import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDejyLHFbx_jItsMMAmfv0J2Ut_UwO1QdM",
  authDomain: "nida-343d8.firebaseapp.com",
  projectId: "nida-343d8",
  storageBucket: "nida-343d8.firebasestorage.app",
  messagingSenderId: "874510083151",
  appId: "1:874510083151:web:5266ef93e9d56829c2f63a"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
