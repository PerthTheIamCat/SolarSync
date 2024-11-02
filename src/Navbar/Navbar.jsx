import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Signin from "../SignIn/Signin";
import SignUp from "../SignUp/Signup";

function Navbar({ onOpenSignUp, isTokenValid }) {
 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const openProfile = () => {
    console.log("Open Profile");
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div id="side-bar" className={isProfileOpen ? "open" : ""}>
        <div id="use-zone">
          <h2 onClick={() => navigate("/setting")}>Settings</h2>
          <h2 onClick={() => { 
            window.localStorage.removeItem("token"); 
            navigate("/signin"); 
          }}>
            Log Out
          </h2>
        </div>
      </div>
      <div className="container">
        <ul>
          <h1 className="LOGO" onClick={() => navigate("/")}>LOGO</h1>
          {isTokenValid ? (
            <div>
              <div id="profile" onClick={openProfile}>
                <img src="https://popcat.click/twitter-card.jpg" alt="profile" />
              </div>
            </div>
          ) : window.location.pathname === "/signup" ? (
            <h1 className="signin">
              Sign In
            </h1>
          ) : (
            <h1 className="signin" onClick={onOpenSignUp}>
              Sign Up
            </h1>
          )}
        </ul>
      </div>

    </>
  );
}

export default Navbar;
