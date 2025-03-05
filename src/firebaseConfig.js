import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZY-FyJ-eMhXn5huw9RMxyRzRVbHN4VTg",
  authDomain: "chatapp-a1ea0.firebaseapp.com",
  projectId: "chatapp-a1ea0",
  storageBucket: "chatapp-a1ea0.appspot.com",
  messagingSenderId: "554539424936",
  appId: "1:554539424936:web:55c3deb9b6e0735717f69d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Added authentication

export { db, auth };
