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
        setActiveButton(buttonName);
        navigate(path);
    };

    return (
        <div>
            <div className="Settingsidebar">
                <h2>Setting</h2>
                <ul className="menu">
                <button
                    onClick={() => handleButtonClick('/setting', 'Profile')}
                    className={activeButton === 'Profile' ? 'active' : ''}
                ><ImProfile /> Profile</button>
                    
                    <button
                    onClick={() => handleButtonClick('/setting/email', 'Email')}
                    className={activeButton === 'Email' ? 'active' : ''}
                ><RiLockPasswordFill /> Email & Password</button>
                    
                    <button
                    onClick={() => handleButtonClick('/setting/notification', 'Notification')}
                    className={activeButton === 'Notification' ? 'active' : ''}
                ><IoIosNotifications /> Nontification</button>
                </ul>
            </div> 
        </div>
    )
}