import { useNavigate } from "react-router-dom";

function Contact({ user }) {
  const navigate = useNavigate();

  

  return (
    <div>
      <h1>ContactPage, {user?.displayName ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1) : '{ERROR} Please Contact The Administration Or LogOut'}</h1>
      
    </div>
  );
}

export default Contact;
