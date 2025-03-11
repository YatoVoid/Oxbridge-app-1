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
import "../style/SideBar.css";

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
    
    <h1>
        HomePage,{" "}
        {user?.displayName
          ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)
          : "{ERROR} Please Contact The Administration Or LogOut"}
    </h1>
  );
}

export default Home;
