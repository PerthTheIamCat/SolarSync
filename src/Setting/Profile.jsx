import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SettingSidebar from "./SettingSidebar";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  document.title = "Profile";

  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    try {
      const updateUser = async () => {
        await axios
          .put(
            "http://localhost:3001/user",
            {
              username: username,
              birthday: birthday,
              img: img,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      updateUser();
      window.location.reload();
      alert("Profile Updated");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const getUser = async () => {
        await axios
          .get("http://localhost:3001/user", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            setUsername(response.data.username);
            setBirthday(response.data.birthday);
            setEmail(response.data.email);
            setImg(response.data.img);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div id="Profile-container">
      <Navbar isTokenValid={true} handleLogout={handleLogout} />
      <div className="Profile relative">
        <div className="banner"></div>
        <div className="profile-container">
          <div className="profile-items">
            <h2>Profile</h2>

            <div className="profile-item">
              <label>Username:</label>
              <input
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="profile-item">
              <label>Birthday:</label>
              <input
                type="date"
                value={birthday || ""}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <input type="email" value={email || ""} readOnly />
            </div>
            <div className="profile-item">
              <label>image URL:</label>
              <input type="text" value={img || ""} onChange={(e) => setImg(e.target.value)}/>
            </div>
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <SettingSidebar />
    </div>
  );
}

export default Profile;
