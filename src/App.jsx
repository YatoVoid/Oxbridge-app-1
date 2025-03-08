import Auth from "./Auth";
import ChatApp from "./ChatApp";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  
  
  return (
    <div>
      

      <Auth setUser={setUser} />
      {user ? <ChatApp user={user} /> : <h2 style={{ textAlign: "center" }}>Please log in to chat</h2>}
    </div>
  );
}

export default App;
