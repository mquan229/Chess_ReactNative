import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Bỏ initializeAuth
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1htNVoIe3AcuExR5oDdfUCZUVA5CLfC8",
  projectId: "chessapp-mobi",
  storageBucket: "chessapp-mobi.appspot.com"
};

const app = initializeApp(firebaseConfig);

// Get Auth with persistence (default to LOCAL_STORAGE)
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db, getApp };
