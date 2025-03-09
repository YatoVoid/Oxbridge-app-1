import { useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    window.location.reload(); 
  };

  return (
    <div>
      <h1>ContactPage, {user?.displayName ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1) : '{ERROR} Please Contact The Administration Or LogOut'}</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
