import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./Auth";
import Home from "./pages/Home"; 
import Contact from "./pages/Contact"; 

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/Home" /> : <Auth setUser={setUser} />} />
        <Route path="/Home" element={user ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path="/Contact" element={user ? <Contact user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
