import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVdw5L2W38za-FOknQ4BX_WJqDN9hPOsM",
  authDomain: "dropdown-cln.firebaseapp.com",
  projectId: "dropdown-cln",
  storageBucket: "dropdown-cln.appspot.com",
  messagingSenderId: "309067461838",
  appId: "1:309067461838:web:091adcecfe993fd5bc4c9f",
  measurementId: "G-1NF953KMFM"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };