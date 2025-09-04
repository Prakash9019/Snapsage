// import { initializeApp, getApps } from "firebase/app";
// import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBDNueFdGSNIJdCW4_Jz3si9b8NbcsgcX8",
//   authDomain: "snap-f86b4.firebaseapp.com",
//   projectId: "snap-f86b4",
//   storageBucket: "snap-f86b4.firebasestorage.app",
//   messagingSenderId: "876382700747",
//   appId: "1:876382700747:android:e7db6f4c6da9654aea874e",
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// export { auth };

// firebaseConfig.ts
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getApps } from 'firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDNueFdGSNIJdCW4_Jz3si9b8NbcsgcX8",
  authDomain: "snap-f86b4.firebaseapp.com",
  projectId: "snap-f86b4",
  storageBucket: "snap-f86b4.appspot.com",
  messagingSenderId: "876382700747",
  appId: "1:876382700747:android:e7db6f4c6da9654aea874e",
};

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// just export auth directly
export { auth };
