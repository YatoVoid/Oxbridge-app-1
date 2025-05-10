
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMenuAlt3,
  HiChartPie,
  HiUser,
  HiTable,
  HiInbox,
  HiLogout,
} from "react-icons/hi";

import "../style/SideBar.css"; 
import { HiOutlineChevronUp } from "react-icons/hi";


import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";





function Sidebar({ user , setUser}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const formatUserName = (name) => {
    if (!name) return "Guest User";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
  
      
      // await setPersistence(auth, browserSessionPersistence);
  
     
      localStorage.setItem("rememberMe", "false");  
      localStorage.removeItem("user"); 
      sessionStorage.clear();
  
      
      // document.cookie.split(";").forEach((c) => { 
      //   document.cookie = c.replace(/^ +/, "")
      //                      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      // });
  
  
      setUser(null);
      navigate("/");
      window.location.reload();
  
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const displayName = formatUserName(user?.displayName);

  return (
    <>
      
      <div className="sidebar">
        <div className="profile-section">
          <HiUser className="icon-large" />
          <p>{displayName}</p>
        </div>

        <div className="grid-menu">
          <div className="grid-item" onClick={() => handleNavigation("/Profile")}>
            <HiUser className="icon" />
            <span>Profile</span>
          </div>
          <div className="grid-item">
            <HiChartPie className="icon" />
            <span>Dashboard</span>
          </div>
          <div className="grid-item" onClick={() => handleNavigation("/Contact")}>
            <HiInbox className="icon" />
            <span>Contact</span>
          </div>
          <div className="grid-item">
            <HiTable className="icon" />
            <span>Reports</span>
          </div>
          <div className="grid-item" onClick={handleLogout}>
            <HiLogout className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

     
      <div className={`mobile-bottom-button ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="menu-icon-wrapper">
          <HiOutlineMenuAlt3 className="menu-icon" />
          <HiOutlineChevronUp className="arrow-icon" />
        </div>
      </div>

   
      <div className={`mobile-bottom-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-grid-menu">
          <div className="grid-item" onClick={() => handleNavigation("/Profile")}>
            <HiUser className="icon" />
            <span>Profile</span>
          </div>
          <div className="grid-item">
            <HiChartPie className="icon" />
            <span>Dashboard</span>
          </div>
          <div className="grid-item" onClick={() => handleNavigation("/Contact")}>
            <HiInbox className="icon" />
            <span>Contact</span>
          </div>
          <div className="grid-item">
            <HiTable className="icon" />
            <span>Reports</span>
          </div>
          <div className="grid-item" onClick={handleLogout}>
            <HiLogout className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Sidebar;
