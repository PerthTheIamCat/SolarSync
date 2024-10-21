import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ isTokenValid }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <ul>
          <h1 className="LOGO" onClick={()=>{navigate("/")}}>LOGO</h1>
          {isTokenValid ? (
            <h1
              className="signout"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            >
              Sign out
            </h1>
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
