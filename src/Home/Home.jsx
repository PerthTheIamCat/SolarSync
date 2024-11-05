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
            navigate("/");
          }
        } catch (error) {
          console.error("Invalid token format", error);
          localStorage.removeItem("token");
          setIsTokenValid(false);
          navigate("/");
        }
      } else {
        console.log("No token found, stay on the Home page.");
      }
      setIsLoaded(true);
    };

    checkToken();
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsTokenValid(false); // อัปเดตสถานะ isTokenValid ทันที
    navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setIsTokenValid(true); // อัปเดต isTokenValid เมื่อเข้าสู่ระบบสำเร็จ
  };

  return (
    <div id="home-container">
      <Sidebar isTokenValid={isTokenValid} />
      <Navbar isTokenValid={isTokenValid} onOpenSignUp={onOpenSignUp} handleLogout={handleLogout}/>
      <div className="HOME relative">
        <div className="banner"></div>
        { isTokenValid && (
        <video 
          className="logo-video" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: "830px", height: "auto" }}
        >
          <source src="/image/Sola_video.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
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
      <div className="HOME ">
        <h1>Welcome to the Dashboard</h1>
      </div>

      {/* Modal for Sign In */}
      {isOpenSignIn && (
        <div className="overlay">
          <div className="modal">
            <Signin
              setToken={setToken}
              onCloseSignIn={() => {
                console.log("Closing Sign In modal");
                setIsOpenSignIn(false);
              }}
              onOpenSignUp={() => {
                console.log("Opening Sign Up modal");
                setIsOpenSignIn(false);
                setIsOpenSignUp(true);
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
