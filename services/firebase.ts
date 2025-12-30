
import { initializeApp } from 'firebase/app';
// Fix: Import firestore, storage and auth as namespace and cast to any to resolve "no exported member" type errors
import * as firebaseFirestore from 'firebase/firestore';
import * as firebaseStorage from 'firebase/storage';
import * as firebaseAuth from 'firebase/auth';

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
let dbVal;
let storageVal;
let authVal;
let ready = false;

try {
  app = initializeApp(firebaseConfig);
  // Use casted namespaces for firestore, storage, and auth
  dbVal = (firebaseFirestore as any).getFirestore(app);
  storageVal = (firebaseStorage as any).getStorage(app);
  authVal = (firebaseAuth as any).getAuth(app);
  ready = true;
  console.log("Firebase initialized successfully");
} catch (e) {
  console.error("Firebase initialization failed:", e);
  ready = false;
}

export const db = dbVal;
export const storage = storageVal;
export const auth = authVal;
export const isFirebaseReady = ready;
