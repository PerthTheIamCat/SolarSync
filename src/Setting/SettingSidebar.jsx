import { React, useState } from 'react';
import './SettingSidebar.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { ImProfile } from "react-icons/im";
//import logo from './logo.png'; // สมมติว่าโลโก้อยู่ในไฟล์นี้
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

    
export default function SettingSidebar() {
    const [activeButton,setActiveButton] = useState("Profile") ;
    const navigate = useNavigate();

    const handleButtonClick = (path, buttonName) => {
        setActiveButton(buttonName); // อัปเดตปุ่มที่ถูกกด
        navigate(path);
    };

    return (
        <div>
            <div className="Settingsidebar">
                <h2>Setting</h2>
                {/* <div className="logo">
                    <img src={logo} alt="Logo" />
                </div> */}
                <ul className="menu">
                <button
                    onClick={() => handleButtonClick('/setting', 'Profile')}
                    className={activeButton === 'Profile' ? 'active' : ''}
                ><ImProfile /> Profile</button>
                    
                    <button
                    onClick={() => handleButtonClick('/setting/solar', 'Email')}
                    className={activeButton === 'Email' ? 'active' : ''}
                ><RiLockPasswordFill /> Email & Password</button>
                    
                    <button
                    onClick={() => handleButtonClick('/setting/weather', 'Noti')}
                    className={activeButton === 'Nonti' ? 'active' : ''}
                ><IoIosNotifications /> Nontification</button>
                </ul>
            </div> 
        </div>
    );
}