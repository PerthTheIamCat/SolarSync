import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ onOpenSignUp, isTokenValid, handleLogout }) {
  const [img, setImg] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const openProfile = () => {
    console.log("Open Profile");
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    try {
      const getUser = async () => {
        await axios
          .get("http://localhost:3001/user", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.img);
            setImg(response.data.img);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <div id="side-bar" className={isProfileOpen ? "open" : ""}>
        <div id="use-zone">
          <h2 onClick={() => navigate("/setting")}>Settings</h2>
          <h2
            onClick={() => {
              handleLogout();
              navigate("/");
              isProfileOpen && setIsProfileOpen(!isProfileOpen);
            }}
          >
            Log Out
          </h2>
        </div>
      </div>
      <div className="container">
        <ul>
          <img
            className="LOGO-Nav"
            src="/image/Logo1.png"
            alt="Logo"
            onClick={() => navigate("/")}
          />
          {isTokenValid ? (
            <div className="Timeline">
              <h2 onClick={() => navigate("/timeline")}>Timeline</h2>
            </div>
          ): ""}
          {isTokenValid ? (
            <div>
              <div id="profile" onClick={openProfile}>
                <img
                  src={
                    img ? img : "/image/blank-profile-picture-973460_1280.webp"
                  }
                  alt="profile"
                />
              </div>
            </div>
          ) : window.location.pathname === "/signup" ? (
            <h1 className="signin">Sign In</h1>
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
