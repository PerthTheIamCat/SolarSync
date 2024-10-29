import { React, useState } from 'react';
import './Sidebar.css';
import { FaSolarPanel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
//import logo from './logo.png'; // สมมติว่าโลโก้อยู่ในไฟล์นี้
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

    
export default function Sidebar({isTokenValid}) {
    const [activeButton,setActiveButton] = useState("home") ;
    const navigate = useNavigate();

    const handleButtonClick = (path, buttonName) => {
        setActiveButton(buttonName); // อัปเดตปุ่มที่ถูกกด
        navigate(path);
    };

    return (
        <div>
            
        {isTokenValid ? (
        <div>
            <div className="sidebar">
                <h2>LOGO</h2>
                {/* <div className="logo">
                    <img src={logo} alt="Logo" />
                </div> */}
                <ul className="menu">
                <button
                    onClick={() => handleButtonClick('/', 'home')}
                    className={activeButton === 'home' ? 'active' : ''}
                ><FaHome /> Home</button>
                    
                    <button
                    onClick={() => handleButtonClick('/solar', 'solar')}
                    className={activeButton === 'solar' ? 'active' : ''}
                ><FaSolarPanel /> Solar Pro Max 360</button>
                    
                    <button
                    onClick={() => handleButtonClick('/weather', 'weather')}
                    className={activeButton === 'weather' ? 'active' : ''}
                ><TiWeatherPartlySunny /> Weather</button>
                </ul>
            </div>
        </div>) : ""}
        
        
        </div>
    );
}