import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./Auth";
import Home from "./pages/Home"; 
import Contact from "./pages/Contact"; 
import Profile from "./pages/Profile"; 

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Auth setUser={setUser} />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path="/contact" element={user ? <Contact user={user} /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
