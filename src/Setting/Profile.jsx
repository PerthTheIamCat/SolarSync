import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import "./Profile.css";

function Profile(user) {
  document.title = "Profile";

  const [username, setUsername] = useState(user.username);
  const [birthday, setBirthday] = useState(user.birthday);
  const email = user.email; // ไม่ให้แก้ไข
   
  const handleSave = () => {
    // ฟังก์ชันจัดการการบันทึกการแก้ไข
    console.log("Saving:", { username, birthday });
    // ส่งข้อมูลไปบันทึกที่ฐานข้อมูล
  };

  return (
    <div id="Profile-container">
      <Navbar isTokenValid={true}  />
         
      <div className="Profile relative">
        <div className="banner"></div>
        <div className="profile-container">
        <div className="profile-items">
            <h2>Profile</h2>

            <div className="profile-item">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="profile-item">
              <label>Birthday:</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div className="profile-item">
              <label>Email:</label>
              <input type="email" value={email} readOnly />
            </div>

            <button className="save-button" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
      
      <div className="Profile">
        <h1>Profile</h1>
        <p>Welcome to the Profile page.</p>
      </div>
      
      <div className="Profile">
        <SettingSidebar  />             
            <h1>Welcome to the Dashboard</h1>
      </div>

    </div>
  );
}

export default Profile;