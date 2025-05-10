import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({ user, setUser }) {
  return (
    <div className="home-container">
      <Sidebar user={user} setUser={setUser} /> 
      <div className="content">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}

export default Layout;
