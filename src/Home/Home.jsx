import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";
import Loading from "../Loading";

function Home() {
  document.title = "Home";
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      setIsLoaded(false);
      if (token) {
      try {
        const decodedToken = await jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
        console.log("Token is valid, user is logged in.");
        setIsTokenValid(true);
        } else {
        console.log("Token has expired.");
        localStorage.removeItem("token");
        setIsTokenValid(false);
        navigate("/signIn");
        }
      } catch (error) {
        console.error("Invalid token format", error);
        localStorage.removeItem("token");
        setIsTokenValid(false);
        navigate("/signIn");
      }
      } else {
      console.log("No token found, stay on the Home page.");
      }
      setIsLoaded(true);
    };
    checkToken();
  }, [navigate]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div id="home-container">
      <Navbar isTokenValid={isTokenValid}/>
      <div className="HOME relative">
        <div className="banner"></div>
        <h1>LOGO</h1>
        {isTokenValid ? "" : (
          <button className="sign-in-btn" onClick={() => navigate("/signIn")}>
            Sign In
          </button>
        )}
      </div>
      <div className="HOME">
        <h1>Home</h1>
        <p>Welcome to the Home page.</p>
      </div>
      
      <div className="HOME ">
          <Sidebar isTokenValid={isTokenValid} />
              <h1>Welcome to the Dashboard</h1>
      </div>

    </div>
  );
}

export default Home;