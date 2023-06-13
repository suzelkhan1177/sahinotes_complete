import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/notes/AuthContext";
import ApiFunction from "../api/ApiFunction";
import { GoogleLogout } from "react-google-login";
import ApiUrl from "../api/ApiUrl";
// import { FaBars } from "react-icons/fa";
// import { ImCross } from "react-icons/im";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const api = ApiFunction();
  const url = ApiUrl();

  const item = JSON.parse(window.localStorage.getItem('user'));

  const onSuccess = async (res) => {
    api.logout();
  };

  let comp;

  if (user) {
    comp = <h4>{user.name}</h4>;
  } else {
    comp = "";
  }

  return (
    <>
      <nav>
        <div className="container main-nav flex">
          <div>
            <Link to="/" className="company-logo">
              <img
                src={require("../assets/images/favicon.ico")}
                alt="company logo"
              />
              <span style={{ fontSize: 25 }}>SahiNotes</span>
            </Link>
          </div>

          <div className="nav-links" id="nav-links">
            {item !== null ? (
              <ul className="flex">
               <li>
               <Link to="/users/profile" className="hover-link">
              <img  className="profile" src={require("../assets/images/Avatar.png")} alt="Profile" />
                </Link>  
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
                  <Link
                    to="/users/logout"
                    onClick={() => {
                      api.logout();
                    }}
                    className="hover-link"
                  >
                    <GoogleLogout
                      clientId={url.clientId()}
                      buttonText="Google LogOut"
                      onLogoutSuccess={onSuccess}
                    />
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex">
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
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
