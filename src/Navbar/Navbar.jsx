import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";


function Navbar({ onOpenSignUp, isTokenValid , handleLogout}) {
 
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
            handleLogout();
            navigate("/"); 
            isProfileOpen && setIsProfileOpen(!isProfileOpen);
          }}>
            Log Out
          </h2>
        </div>
      </div>
      <div className="container">
        <ul>
          <img className="LOGO-Nav" src="/image/Logo1.png" alt="Logo" onClick={() => navigate("/")}/>

          <div className="Timeline">
            <h2 onClick={()=> navigate('/timeline')}>Timeline</h2>
          </div>

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
