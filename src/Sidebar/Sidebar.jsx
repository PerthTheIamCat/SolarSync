import { React } from 'react';
import './Sidebar.css';
import { FaSolarPanel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useNavigate, useLocation } from 'react-router-dom';

    
export default function Sidebar({isTokenValid}) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
        {isTokenValid ? (
        <div>
            <div className="sidebar">
            <img className="LOGO-Side" src="/image/Logo-dark-removebg.png" alt="Logo" onClick={() => navigate("/")}/>
                <ul className="menu">
                <button
                    onClick={() => navigate('/')}
                    className={location.pathname === '/' ? 'active' : ''}
                ><FaHome /> Home</button>
                    
                    <button
                    onClick={() => navigate('/solar')}
                    className={location.pathname === '/solar' ? 'active' : ''}
                ><FaSolarPanel /> Solar Pro Max 360</button>
                    
                    <button
                    onClick={() => navigate('/weather')}
                    className={location.pathname === '/weather' ? 'active' : ''}
                ><TiWeatherPartlySunny /> Weather</button>
                </ul>
            </div>
        </div>) : ""}
        
        
        </div>
    );
}