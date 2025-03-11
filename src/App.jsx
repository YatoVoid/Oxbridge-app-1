import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./Auth";
import Home from "./pages/Home"; 
import Contact from "./pages/Contact"; 
import Profile from "./pages/Profile"; 
import Layout from "./components/Layout";


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        
      <Route path="/" element={user ? <Navigate to="/home" /> : <Auth setUser={setUser} />} />

      {/* Routes with Layout and Sidebar */}
      <Route path="/" element={user ? <Layout user={user} setUser={setUser} /> : <Navigate to="/" />}>
      <Route path="home" element={<Home user={user} />} />
      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
      </Route>

      {/* Optional: Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
