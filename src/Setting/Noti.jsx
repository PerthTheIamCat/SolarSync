import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import "./Noti.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Noti(user) {
  document.title = "Notification";

  const [isNotiEnabled, setIsNotiEnabled] = useState(false);
  const navigate = useNavigate();

  const handleToggle = async () => {
    await axios.post("http://localhost:3001/notification/toggle", {
      isNotiEnabled: !isNotiEnabled,
    }, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(() => {
      setIsNotiEnabled(!isNotiEnabled);
      alert("Notification setting has been updated");
    }).catch((error) => {
      console.error(error);
    })
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
  };

  useEffect(() => {
    axios.get("http://localhost:3001/user", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      setIsNotiEnabled(response.data.isNotiEnabled);
    }).catch((error) => {
      console.error(error);
    });
  } ,[]);

  return (
    <div id="Noti-container">
      <Navbar isTokenValid={true} handleLogout={handleLogout} />

      <div className="Noti relative">
        <div className="banner"></div>
        <div className="noti-container">
            <div className="noti-items">
                <h2>Notification</h2>
                <div className="noti-item">
                    <label className="noti-label">
                        <span>Send weather alert E-mail</span>
                        <span className="checkbox">
                        <input
                        type="checkbox"   
                        checked={isNotiEnabled}
                        onChange={handleToggle}
                        />
                        </span>
                        
                    </label>
                </div>
            </div>
        </div>
      </div>
      <div className="Noti">
        <SettingSidebar  />             
            <h1>Welcome to the Dashboard</h1>
      </div>

    </div>
  );
}

export default Noti;