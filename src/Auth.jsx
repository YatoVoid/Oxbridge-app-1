import { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './Auth.css'

function Auth({ user, setUser }) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      
      const loggedInUser = userCredential.user;
      
      
      const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user"; 
      
      setUser({ ...loggedInUser, displayName: email.split("@")[0], role });
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "0%", paddingBottom:"20%"}}>
      {user ? (
        <div>
          <h2>Welcome, {user?.email}</h2>
          <p>Role: {user?.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div style={{backgroundColor:"white",paddingTop:"15%",paddingBottom:"12%",borderRadius:"10%", maxWidth:"90%",margin: "auto"}}> 
          <h2 style={{color:"black"}}>{isLogin ? "Lets Learn Together" : "Sign Up"}</h2>
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={loading}
            style={{ fontSize: "18px", padding: "10px", width: "50%"}}
          />
          
          <input  
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={loading}
            style={{ fontSize: "18px", padding: "10px", width: "50%"}}
          />
          
          <div style={{ textAlign: "center", padding: "0%",paddingTop:"5%",tabSize:"100%"}}>
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
