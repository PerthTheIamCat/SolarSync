import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ isTokenValid }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const openProfile = () => {
    console.log("Open Profile");
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate();
  return (
    <>
      <div id="side-bar" className={isProfileOpen ? "open" : ""} >
        <div id="use-zone">
          <h2 onClick={()=>{ navigate("/setting")}}>Settings</h2>
          <h2 onClick={()=>{ window.localStorage.removeItem("token"); navigate("/signin"); }}>Log Out</h2>
        </div>
      </div>
      <div className="container">
        <ul>
          <h1 className="LOGO" onClick={()=>{navigate("/")}}>LOGO</h1>
          {isTokenValid ? (
            <div>
              <div id="profile" onClick={openProfile}>
                <img src="https://popcat.click/twitter-card.jpg" alt="profile" />
              </div>
            </div>
          ) : window.location.pathname === "/signup" ? (
            <h1
              className="signup"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </h1>
          ) : (
            <h1
              className="signin"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </h1>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
