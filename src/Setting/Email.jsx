import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import axios from "axios";
import emailjs from "emailjs-com";
import "./Email.css";
import { useNavigate } from "react-router-dom";


function Email(user) {
  document.title = "E-mail & Password";
  const [email, setEmail] = useState(""); // เก็บ email ใหม่
  const [password1, setPassword1] = useState(""); // เก็บ password ใหม่ (ครั้งที่ 1)
  const [password2, setPassword2] = useState(""); // เก็บ password ใหม่ (ครั้งที่ 2)
  const [error, setError] = useState(""); // เก็บข้อผิดพลาด
  const [showModal, setShowModal] = useState(false); // สำหรับควบคุมการแสดงผลของ modal
  const [otp, setOtp] = useState(Array(6).fill("")); // เก็บค่า OTP แยกเป็น 6 ช่อง
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const sendEmail = async (otp, email) => {
    return emailjs
      .send(
        "service_btq6qg9",
        "template_70xeicx",
        { OTP: otp, reply_to: email, email: email },
        "Ff_Au8ZHm82n1G0Y9"
      )
      .then((result) => {
        console.log('Email sent:', result.text);
      })
      .catch((error) => {
        console.error('Email sending error:', error);
      });
  };

  const handleSentOTP = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Password does not match");
      return;
    }
    try {
      setError("");
      await axios.post(
        "http://localhost:3001/sendotp",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        console.log(res);
        sendEmail(res.data.otp, res.data.email);
        setShowModal(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  async function sha256Hash(msg) {
    const data = new TextEncoder().encode(msg); // แปลงเป็นไบนารี
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // คำนวณแฮช
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); // แปลงเป็นฐาน 16
  }

  const handleChangeOtp = (index, value) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value; // กำหนดค่าในช่องที่เลือก
      setOtp(newOtp);

      // Focus to next input if value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
      // Focus to previous input if backspace is pressed and current is empty
      if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmitOtp = async () => {
    const userOtp = otp.join("");
    await axios.post("http://localhost:3001/verifyotp", {
      otp: userOtp,
    }, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(async (res) =>  {
      console.log(res);
      const hashedPassword = await sha256Hash(password1);
      if (res.status === 200) {
        axios.put("http://localhost:3001/password", {
          password: hashedPassword,
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            window.location.reload();
          }
        });
      }
      alert('Password Changed');
    }).catch((error) => {
      console.error(error);
      setError("Invalid OTP");
    })
  };
  useState(async () => {
    await axios.get("http://localhost:3001/user", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      setEmail(res.data.email);
    });
  }, []);

    
  return (
    <div id="container">
      <Navbar isTokenValid={true} handleLogout={handleLogout}/>
      <div className="Email relative">
        <div className="banner"></div>
        <div className="email-container">
          <div className="email-items">
            <h2>Email & Password</h2>
            <div className="item">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                readOnly
              />
            </div>
            <div className="item">
              <label>Change Password:</label>
              <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div className="item">
              <label>Recheck Password:</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* แสดงข้อผิดพลาดถ้ามี */}
            <button className="save-button" onClick={handleSentOTP}>
              Send OTP
            </button>{" "}
            {/* ปุ่มสำหรับส่ง OTP */}
            {/* Modal สำหรับกรอก OTP */}
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Enter Your OTP</h3>
                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChangeOtp(index, e.target.value)}
                        maxLength={1}
                        placeholder="-"
                      />
                    ))}
                  </div>
                  <button className="Sm1" onClick={handleSubmitOtp}>
                    Submit OTP
                  </button>
                  <button
                    className="Sm2"
                    onClick={() => {
                      setShowModal(false); // ปิด modal
                      setOtp(Array(6).fill("")); // ล้างค่า OTP
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SettingSidebar />
    </div>
  );
}

export default Email;
