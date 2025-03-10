import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMenuAlt3,
  HiChartPie,
  HiUser,
  HiTable,
  HiInbox,
  HiLogout
} from "react-icons/hi";

import "../style/Home.css";

function Home({ user }) {
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
  const displayName = formatUserName(user?.displayName);

  return (
    <div className="home-container">
   
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
          <div className="grid-item">
            <HiLogout className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

     
      <div className="mobile-bottom-button" onClick={toggleMenu}>
        <HiOutlineMenuAlt3 className="menu-icon" />
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
          <div className="grid-item">
            <HiLogout className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

   
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

    
      <div className="content">
        {/* <h1>Welcome, {user?.displayName || "User"}!</h1>
        <button onClick={() => handleNavigation("/Profile")}>Profile</button>
        <button onClick={() => handleNavigation("/Contact")}>Contact Us</button> */}
      </div>
    </div>
  );
}

export default Home;
