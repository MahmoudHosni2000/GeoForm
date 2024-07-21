import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdAq6C-9AhIasGvR0dFPK42rkd2CH0X34",
  authDomain: "edgepro-compony.firebaseapp.com",
  projectId: "edgepro-compony",
  storageBucket: "edgepro-compony.appspot.com",
  messagingSenderId: "100473817896",
  appId: "1:100473817896:web:9d8d7ad82eb23a971bde1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
