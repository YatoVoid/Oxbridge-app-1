
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import "../style/SideBar.css";
import { useOutletContext } from "react-router-dom";



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
      <h1>
        ProfilePage,{" "}
        {user?.displayName
          ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)
          : "{ERROR} Please Contact The Administration Or LogOut"}
    </h1>
      
     
    </div>
  );
}

export default Profile;
