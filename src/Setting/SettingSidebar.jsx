import { React, useState } from 'react';
import './SettingSidebar.css';
import { FaSolarPanel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
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
            <div className="sidebar">
                <h2>Setting</h2>
                <ul className="menu">
                <button
                    onClick={() => handleButtonClick('/setting', 'Profile')}
                    className={activeButton === 'Profile' ? 'active' : ''}
                ><FaHome /> Home</button>
                    
                    <button
                    onClick={() => handleButtonClick('/solar-pro-max-360', 'Solar')}
                    className={activeButton === 'Solar' ? 'active' : ''}
                ><FaSolarPanel /> Solar Pro Max 360</button>
                    
                    <button
                    onClick={() => handleButtonClick('/setting/weather', 'Nonti')}
                    className={activeButton === 'Weather' ? 'active' : ''}
                ><TiWeatherPartlySunny /> Weather</button>
                </ul>
            </div> 
        </div>
    );
}