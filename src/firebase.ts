import {
    getApp,
    getApps,
    initializeApp,
} from 'firebase/app';

import {
    getAuth,
} from 'firebase/auth';

import {
    getDatabase,
} from 'firebase/database';

// ChatVibez Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiA1ajeXCbFewXAP2Fa1qh0Z-qYGdhQBo",
  authDomain: "chatvibez-82874.firebaseapp.com",
  databaseURL: "https://chatvibez-82874-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatvibez-82874",
  storageBucket: "chatvibez-82874.firebasestorage.app",
  messagingSenderId: "747078494632",
  appId: "1:747078494632:web:b46659fa9dfbf1bd97559d",
  measurementId: "G-8HGJ55QQ1M",
};

// Initialize Firebase
const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firebase Realtime Database
export const database = getDatabase(app);

// Export Firebase App
export default app;