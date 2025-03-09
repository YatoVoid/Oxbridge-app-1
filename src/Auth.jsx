import { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import './Auth.css'



function Auth({ user, setUser }) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      const rememberMe = localStorage.getItem("rememberMe") === "true";
      
      if (loggedInUser && rememberMe) {
        setUser({ ...loggedInUser, displayName: loggedInUser.email.split("@")[0] });
      } else {
        setUser(null); 
        localStorage.setItem("rememberMe", "false");
      }
    });
  
    return () => unsubscribe();
  }, []);

  
const handleAuth = async () => {
  setLoading(true);
  setError("");

  try {
    //await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    
    const userCredential = isLogin
      ? await signInWithEmailAndPassword(auth, email, password)
      : await createUserWithEmailAndPassword(auth, email, password);

    const loggedInUser = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    const userData = { ...loggedInUser, displayName: email.split("@")[0], role };

    setUser(userData);

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    setEmail("");
    setPassword("");
  } catch (error) {
    setError(error.message);
  }
  setLoading(false);
};



const handleLogout = async () => {
  try {
    await signOut(auth);  // Sign out from Firebase

    // 🔹 Reset persistence to session-based after logging out
    await setPersistence(auth, browserSessionPersistence);

    // 🔹 Explicitly set rememberMe to false & remove user data
    localStorage.setItem("rememberMe", "false");  // Ensure it's updated
    localStorage.removeItem("user"); 
    sessionStorage.clear();

    // 🔹 Clear cookies (force logout)
    document.cookie.split(";").forEach((c) => { 
      document.cookie = c.replace(/^ +/, "")
                         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 🔹 Update state & reload the page to apply changes
    setUser(null);
    navigate("/");
    window.location.reload();

  } catch (error) {
    console.error("Error logging out:", error);
  }
};


  

  return (
    <div style={{ textAlign: "center", padding: "0%", paddingBottom: "20%" }}>
      {user ? (
        <div>
          <h2>Welcome, {user?.email}</h2>
          <p>Role: {user?.role}</p>
          <button onClick={handleLogout} color="black" backgroundColor="black">Logout</button>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", paddingTop: "15%", paddingBottom: "12%", borderRadius: "10%", maxWidth: "90%", margin: "auto" }}>
          <h2 style={{ color: "black" }}>{isLogin ? "Let's Learn Together" : "Sign Up"}</h2>

          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={loading}
            style={{ fontSize: "18px", padding: "10px", width: "50%" }}
          />

          <input  
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={loading}
            style={{ fontSize: "18px", padding: "10px", width: "50%" }}
          />

          
          <div style={{ marginTop: "10px" , color:"black"}}>
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
            />
            <label htmlFor="rememberMe" > Remember Me</label>
          </div>

          <div style={{ textAlign: "center", padding: "0%", paddingTop: "5%" }}>
            <button onClick={handleAuth} disabled={loading} className={error ? "shake" : ""}>
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
            {isLogin ? "Create an account" : "Already have an account? Login"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Auth;
