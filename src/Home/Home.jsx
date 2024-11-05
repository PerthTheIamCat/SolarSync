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
      <Navbar isTokenValid={isTokenValid} onOpenSignUp={onOpenSignUp} handleLogout={handleLogout}/>
      <Sidebar isTokenValid={isTokenValid} />
      <div className="HOME relative">
        <div className="banner"></div>
        { isTokenValid && (
        <div className="welcome-HomeSignin">
          <div className="welcome-HomePage1">
            <h1 className="intro-textSignin">Welcome to Solar Sync</h1>
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
            <p className="intro-textSignin">
            ก้าวสู่โลกใหม่แห่งการใช้พลังงานแสงอาทิตย์ ด้วยระบบติดตามแสงอัจฉริยะที่ออกแบบมา
            เพื่อประสิทธิภาพสูงสุดของคุณ เราพร้อมให้คุณติดตามและควบคุมการทำงานของระบบพลังงานแสงอาทิตย์
            ได้ง่ายดายและสะดวกขึ้นทุกที่ ทุกเวลา
            </p>
          </div>
        </div>

      )}

        { !isTokenValid && (
          <div className="welcome-Home">
              <h1 className="intro-text">Welcome to Solar Sync</h1>
              <p className="intro-text">
              ก้าวสู่โลกใหม่แห่งการใช้พลังงานแสงอาทิตย์ ด้วยระบบติดตามแสงอัจฉริยะที่ออกแบบมา
              เพื่อประสิทธิภาพสูงสุดของคุณ เราพร้อมให้คุณติดตามและควบคุมการทำงานของระบบพลังงานแสงอาทิตย์
              ได้ง่ายดายและสะดวกขึ้นทุกที่ ทุกเวลา
              </p>
            </div>
        )}
        {!isTokenValid && (
          <button className="sign-in-btn" onClick={() => setIsOpenSignIn(true)}>
            Sign In
          </button>
        )}
      </div>

      {!isTokenValid && (
          <div className="About_Us">
            <h1 className="intro-text">Member</h1>
            <div className="member-list">
              <h2 className="intro-text">6530300902 ปวริศ สิงห์ทอง</h2>
              <h2 className="intro-text">6530300970 ภาวิต ทองคำ</h2>
              <h2 className="intro-text">6530300988 ภูริภัทร นกคุ้มทอง</h2>
            </div>
          </div>
        )}


      { isTokenValid && (
        <div className="About_Us_signin">
          <h1 className="intro-text_signin">Member</h1>
          <h2 className="intro-text_signin">6530300902 ปวริศ สิงห์ทอง</h2>
          <h2 className="intro-text_signin">6530300970 ภาวิต ทองคำ</h2>
          <h2 className="intro-text_signin">6530300988 ภูริภัทร นกคุ้มทอง</h2>

        </div>
      )}

      


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
