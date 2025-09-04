// 1. First, create firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBDNueFdGSNIJdCW4_Jz3si9b8NbcsgcX8",
  authDomain: "snap-f86b4.firebaseapp.com",
  projectId: "snap-f86b4",
  storageBucket: "snap-f86b4.firebasestorage.app",
  messagingSenderId: "876382700747",
  appId: "1:876382700747:android:e7db6f4c6da9654aea874e",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  auth = getAuth(app);
}

export { auth, firebaseConfig };