import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import "./Noti.css";

function Noti(user) {
  document.title = "Notification";

  const [isNotiEnabled, setIsNotiEnabled] = useState(false);

  const handleToggle = () => {
    const newStatus = !isNotiEnabled;
    setIsNotiEnabled(newStatus);

    if (newStatus) {
      alert("เปิดการแจ้งเตือนแล้ว");
    } else {
      alert("ปิดการแจ้งเตือนแล้ว");
    }
  };

  return (
    <div id="Noti-container">
      <Navbar isTokenValid={true}  />

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