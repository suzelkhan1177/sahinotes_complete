import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/notes/AuthContext";
import ApiFunction from "../api/ApiFunction";
import {GoogleLogout} from  'react-google-login';
const clientId = "1011703805644-0bd3gm5uo9unqsvk3aaepqehr8nntunk.apps.googleusercontent.com";
// import { FaBars } from "react-icons/fa";
// import { ImCross } from "react-icons/im";

const Navbar = () => {

  const {user} = useContext(AuthContext);
  const api = ApiFunction();

  const onSuccess = async (res) => {
     api.logout();
}

  let comp;

  if (user) {
    comp = <h4>{user.name}</h4>
  } else {
    comp = ''
  }

  return (
    <>
    <nav>
  <div className="container main-nav flex">
    <div>
      <Link to="/" className="company-logo">
        <img src={require('../assets/images/favicon.ico')} alt="company logo" />
        <span style={{ fontSize: 25 }}>SahiNotes</span>
      </Link>
    </div>

   
    <div className="nav-links" id="nav-links">
      <ul className="flex">

     <GoogleLogout
          clientId={clientId}
          buttonText="Google LogOut"
          onLogoutSuccess={onSuccess}
     />
        

        <li>
          <Link to="/users/profile" className="hover-link">
            {comp}
           
          </Link>
        </li>
        <li>
          <Link to="/users/upload_notes" className="hover-link">
            Upload_Note
          </Link>
        </li>
        <li>
          <Link to="/users/mobile_verify" className="hover-link">
            Verify_Mobile
          </Link>
        </li>
        <li>
          <Link to="/users/logout" onClick={()=>{api.logout();}} className="hover-link">
            LogOut
          </Link>
        </li>

        
        <li>
          <Link to="/signin" className="hover-link secondary-button">
           LogIn
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover-link primary-button">
            SignUp
          </Link>
        </li>
        
      </ul>
    </div>


  </div>
</nav>
      
    </>
  );
};
export default Navbar;
