import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Timeline.css";
import Loading from "../Loading";
import Signin from "../SignIn/Signin";
import SignUp from "../SignUp/Signup";

function Timeline(props) {
  document.title = "Timeline";
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
      <Navbar
        isTokenValid={isTokenValid}
        onOpenSignUp={onOpenSignUp}
        handleLogout={handleLogout}
      />
      <div className="HOME relative">
        <div className="banner"></div>
        <div className="HOME intro-text">
          <h1>Timeline</h1>
          <h2>Day1</h2>
          <div className="image_container">
            <img
              src="/image/day1/1.png"
              alt="timeline-day1"
              className="timeline-image1"
              height={600}
              width={600}
            />
            <img
              src="/image/day1/2.png"
              alt="timeline-day1"
              className="timeline-image2"
              height={600}
              width={600}
            />
            <img
              src="/image/day1/3.png"
              alt="timeline-day1"
              className="timeline-image3"
              height={600}
              width={600}
            />
            <img
              src="/image/day1/4.png"
              alt="timeline-day1"
              className="timeline-image4"
              height={600}
              width={600}
            />
            <img
              src="/image/day1/5.png"
              alt="timeline-day1"
              className="timeline-image4"
              height={600}
              width={600}
            />
            <video
              width="600"
              height="600"
              autoPlay
              loop
              muted
              playsInline
              style={{ backgroundColor: "black" }}
            >
              <source src="/image/Solar_video.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p>
            ได้ทำการออกแบบ Model ของตัวแท่นวางและแกนหมุนของ Solar Cell
            รวมถึงออกแบบ Figma ของหน้าเว็ปไว้ก่อนเพื่อใช้แสดงข้อมูลผ่านเว็ปไซต์
          </p>
        </div>
        {!isTokenValid && (
          <button className="sign-in-btn" onClick={() => setIsOpenSignIn(true)}>
            Sign In
          </button>
        )}
      </div>

      <div className="HOME intro-text">
        <h2>Day2</h2>
        <div className="image_container">
          <img
            src="/image/day2/1.jpg"
            alt="timeline-day2"
            className="timeline-image1"
            width={600}
          />
          <img
            src="/image/day2/2.jpg"
            alt="timeline-day2"
            className="timeline-image2"
            width={600}
          />
          <img
            src="/image/day2/3.jpg"
            alt="timeline-day2"
            className="timeline-image3"
            width={600}
          />
          <img
            src="/image/day2/4.jpg"
            alt="timeline-day2"
            className="timeline-image4"
            width={600}
          />
          <img
            src="/image/day2/5.jpg"
            alt="timeline-day2"
            className="timeline-image5"
            width={600}
          />
          <img
            src="/image/day2/6.jpg"
            alt="timeline-day2"
            className="timeline-image6"
            width={600}
          />
          <video
            width="600"
            autoPlay
            loop
            muted
            playsInline
            style={{ backgroundColor: "black" }}
          >
            <source src="/image/day2/7.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p>ในวันนี้ได้ทำการทำแท่นวาง Solar Cell โดยมาประกอบกันของแต่ละส่วน</p>
      </div>
      <div className="HOME intro-text">
        <h2>Day3</h2>
        <div className="image_container">
          <img
            src="/image/day3/1.jpg"
            alt="timeline-day3"
            className="timeline-image1"
            width={600}
          />
          <img
            src="/image/day3/2.jpg"
            alt="timeline-day3"
            className="timeline-image2"
            width={600}
          />
          <img
            src="/image/day3/3.jpg"
            alt="timeline-day3"
            className="timeline-image3"
            width={600}
          />
          <img
            src="/image/day3/4.jpg"
            alt="timeline-day3"
            className="timeline-image4"
            width={600}
          />
          <img
            src="/image/day3/5.jpg"
            alt="timeline-day3"
            className="timeline-image5"
            width={600}
          />
          <img
            src="/image/day3/6.jpg"
            alt="timeline-day3"
            className="timeline-image6"
            width={600}
          />
          <img
            src="/image/day3/7.jpg"
            alt="timeline-day3"
            className="timeline-image7"
            width={600}
          />
          <video
            width="600"
            autoPlay
            loop
            muted
            playsInline
            style={{ backgroundColor: "black" }}
          >
            <source src="/image/day3/8.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p>
          ในวันนี้ได้ทำการทำแกนหมุนแท่นวาง Solar Cell โดยมาประกอบกันและทำการทาสี
        </p>
      </div>
      <div className="HOME intro-text">
        <h2>Day4</h2>
        <div className="image_container">
          <img
            src="/image/day4/1.png"
            alt="timeline-day4"
            className="timeline-image1"
            height={700}
          />
          <img
            src="/image/day4/2.png"
            alt="timeline-day4"
            className="timeline-image2"
            height={700}
          />
          <img
            src="/image/day4/3.png"
            alt="timeline-day4"
            className="timeline-image3"
            height={700}
          />
        </div>
        <p>
          ทำการออกแบบและตรวจสอบ FlowChart, Schematic และ PCB
          แล้วจึงทำการสั่งซื้ออุปกรณ์ที่ต้องใช้ในการทำ
        </p>
      </div>
      <div className="HOME intro-text">
        <h2>Day5</h2>
        <div className="image_container">
          <img
            src="/image/day5/2.jpg"
            alt="timeline-day4"
            className="timeline-image1"
            height={700}
          />
          <img
            src="/image/day5/3.jpg"
            alt="timeline-day4"
            className="timeline-image2"
            height={700}
          />
        </div>
        <p>
          เมื่อได้รับ PCB ทำการบัดกีกับ Pin Header
          เพื่อความสะดวกในการเชื่อมสายไฟ
        </p>
      </div>
      <div className="HOME intro-text">
        <h2>Day6</h2>
        <div className="image_container">
          <img
            src="/image/day6/2.jpg"
            alt="timeline-day6"
            className="timeline-image1"
            height={700}
          />
          <img
            src="/image/day6/1.png"
            alt="timeline-day6"
            className="timeline-image2"
            height={700}
          />
        </div>
        <p>ทำการติดอุปกรณ์เข้ากับ Model รวมถึงเชื่อมสายไฟต่างๆ</p>
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

export default Timeline;
