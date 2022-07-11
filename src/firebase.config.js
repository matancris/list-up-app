import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "list-it-up-d2803.firebaseapp.com",
  projectId: "list-it-up-d2803",
  storageBucket: "list-it-up-d2803.appspot.com",
  messagingSenderId: "438295678609",
  appId: "1:438295678609:web:b023baaeea6775ec5f3930",
  measurementId: "G-YPK2D5Q0H4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.analytics();
export const db = getFirestore(app)
