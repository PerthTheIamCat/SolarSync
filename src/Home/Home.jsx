import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";
import Loading from "../Loading";
import Signin from "../SignIn/Signin";
import SignUp from "../SignUp/Signup";  

function Home(props) {
  document.title = "Home";
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const onOpenSignUp = () => {
    setIsOpenSignUp(true);
  };

  useEffect(() => {
    const checkToken = async () => {
      setIsLoaded(false);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            console.log("Token is valid, user is logged in.");
            setIsTokenValid(true);
          } else {
            console.log("Token has expired.");
            localStorage.removeItem("token");
            setIsTokenValid(false);
            navigate("/signin");
          }
        } catch (error) {
          console.error("Invalid token format", error);
          localStorage.removeItem("token");
          setIsTokenValid(false);
          navigate("/signin");
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
      <Navbar isTokenValid={isTokenValid} onOpenSignUp={onOpenSignUp} />
      <div className="HOME relative">
        <div className="banner"></div>
        <h1>LOGO</h1>
        {!isTokenValid && (
          <button className="sign-in-btn" onClick={() => setIsOpenSignIn(true)}>
            Sign In
          </button>
        )}
      </div>

      <div className="HOME">
        <h1>Home</h1>
        <p>Welcome to the Home page.</p>
      </div>

      <div className="HOME">
        <Sidebar isTokenValid={isTokenValid} />
        <h1>Welcome to the Dashboard</h1>
      </div>

      {/* Modal for Sign In */}
      {isOpenSignIn && (
        <div className="overlay">
          <div className="modal">
            <Signin
              setToken={props.setToken}
              onCloseSignIn={() => setIsOpenSignIn(false)}
              onOpenSignUp={() => {
                setIsOpenSignIn(false);
                setIsOpenSignUp(true); // Open Sign Up when needed
              }}
            />
          </div>
        </div>
      )}

      {/* Modal for Sign Up */}
      {isOpenSignUp && (
        <div className="overlay">
          <div className="modal">
            <SignUp 
              onCloseSignUp={() => setIsOpenSignUp(false)} 
              onOpenSignIn={() => {
                setIsOpenSignUp(false);
                setIsOpenSignIn(true); // Open Sign In when needed
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
