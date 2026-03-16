// FILE: services/firebase.ts (FIXED)
// CHANGES:
//  1. Removed console.log("Firebase initialized successfully") — leaks info in production
//  2. Kept error logging (important for debugging) but made it less verbose
//  3. No code changes needed for config keys — Firebase client keys are designed to be public
//     (security comes from Firestore/Storage RULES, not from hiding these keys)

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail, 
  signOut 
} from 'firebase/auth';

// NOTE: Firebase client-side config keys are NOT secrets.
// Security is enforced by Firestore and Storage RULES (see firebase-rules/ folder).
const firebaseConfig = {
  apiKey: "AIzaSyC9MOaWyxM0Dw0WJNH1UCvEVupS2zRKPhs",
  authDomain: "sassynary-35159.firebaseapp.com",
  projectId: "sassynary-35159",
  storageBucket: "sassynary-35159.firebasestorage.app",
  messagingSenderId: "590153869406",
  appId: "1:590153869406:web:766b8bb14036ad129eaccf",
  measurementId: "G-78MNLDR82L"
};

let app;
let db: any;
let storage: any;
let auth: any;
let isFirebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  isFirebaseReady = true;
} catch (e) {
  // Only log in development
  if (import.meta.env?.DEV) {
    console.error("Firebase initialization failed:", e);
  }
  isFirebaseReady = false;
}

export { db, storage, auth, isFirebaseReady };

export { 
  collection, addDoc, getDocs, doc, setDoc, deleteDoc, updateDoc, 
  onSnapshot, query, where, orderBy, limit, serverTimestamp, arrayUnion, arrayRemove 
};

export { ref, uploadBytes, getDownloadURL };

export { 
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  updateProfile, sendPasswordResetEmail, signOut 
};
