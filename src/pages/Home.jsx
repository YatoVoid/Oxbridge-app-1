import { useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  

  const navigateToContact = () => {
    navigate("/Contact");  
  };
  const navigateToProfile = () => {
    navigate("/Profile");  
  };

  return (
    <div>
      <h1>Welcome, {user?.displayName ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1) : '{ERROR} Please Contact The Administration Or LogOut'}</h1>

      <button onClick={navigateToProfile}>Profile</button>
      <button onClick={navigateToContact}>Contact Us</button>
    </div>
  );
}


export default Home;
