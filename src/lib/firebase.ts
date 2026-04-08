import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-1T61IYfBhLkXzMmCiNbsR9D6RpzmW_M",
  authDomain: "nidayeni-14b20.firebaseapp.com",
  projectId: "nidayeni-14b20",
  storageBucket: "nidayeni-14b20.firebasestorage.app",
  messagingSenderId: "832471668176",
  appId: "1:832471668176:web:cbe2cba7493ac12cecd5d5",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
