
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

// ------------------------------------------------------------------
// CONFIGURATION ACTIVE
// Project: Sassynary (sassynary-35159)
// Connection: Live
// ------------------------------------------------------------------

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
  console.log("Firebase initialized successfully");
} catch (e) {
  console.error("Firebase initialization failed:", e);
  isFirebaseReady = false;
}

// Export instances
export { db, storage, auth, isFirebaseReady };

// Export Firestore functions directly
export { 
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
};

// Export Storage functions directly
export { 
  ref, 
  uploadBytes, 
  getDownloadURL 
};

// Export Auth functions directly
export { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail, 
  signOut 
};
