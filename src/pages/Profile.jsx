
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";

function Profile({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setUser(null); 
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out:", error); 
    }
  };

  return (
    <div>
      <h1>Profile Picture</h1>
      <h1>{user?.displayName || "Name Surname"}</h1> 
      <h1>Level/Experience Bar</h1>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
