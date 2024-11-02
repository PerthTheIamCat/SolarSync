import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import "./Email.css";

function Email(user) {
  document.title = "E-mail & Password";
  const [email, setEmail] = useState(""); // เก็บ email ใหม่
  const [password1, setPassword1] = useState(""); // เก็บ password ใหม่ (ครั้งที่ 1)
  const [password2, setPassword2] = useState(""); // เก็บ password ใหม่ (ครั้งที่ 2)
  const [error, setError] = useState(""); // เก็บข้อผิดพลาด
  const [showModal, setShowModal] = useState(false); // สำหรับควบคุมการแสดงผลของ modal
  const [otp, setOtp] = useState(Array(6).fill("")); // เก็บค่า OTP แยกเป็น 6 ช่อง

  const handleSave = () => {
    if (password1 !== password2) {
      setError("Passwords do not match!"); // ถ้ารหัสผ่านไม่ตรงกัน แสดงข้อผิดพลาด
      return;
    }
    setError(""); // ถ้ารหัสผ่านตรงกัน ลบข้อผิดพลาด
    console.log("Saving email and password:", { email, password: password1 });
    // แสดง modal เพื่อกรอก OTP
    setShowModal(true);
  };

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

  const handleSubmitOtp = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      console.log("OTP submitted:", otpString);
      setShowModal(false); // ปิด modal เมื่อ OTP ถูกรับ
      // สามารถทำการบันทึกข้อมูลหรืออื่นๆ ตามต้องการ
    } else {
      setError("Please enter a valid 6-digit OTP!");
    }
  };

  return (
    <div id="container">
      <Navbar isTokenValid={true} />
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
                onChange={(e) => setEmail(e.target.value)}
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

            {error && <p style={{ color: "red" }}>{error}</p>} {/* แสดงข้อผิดพลาดถ้ามี */}

            <button className="save-button" onClick={handleSave}>
              Send OTP
            </button> {/* ปุ่มสำหรับส่ง OTP */}

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
                  <button className="Sm1" onClick={handleSubmitOtp}>Submit OTP</button>
                  <button className="Sm2" onClick={() => { 
                      setShowModal(false); // ปิด modal 
                      setOtp(Array(6).fill("")); // ล้างค่า OTP
                    }}>Cancel</button>

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
