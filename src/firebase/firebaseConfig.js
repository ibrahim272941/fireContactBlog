import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRbKOR_UGTo2HBOAZohr919zNM_PoBUQw",
  authDomain: "blogproject-3b606.firebaseapp.com",
  projectId: "blogproject-3b606",
  storageBucket: "blogproject-3b606.appspot.com",
  messagingSenderId: "964091865048",
  appId: "1:964091865048:web:e8dcba43c4ca29498a34ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
