import { React, useState } from 'react';
import './SettingSidebar.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { ImProfile } from "react-icons/im";
//import logo from './logo.png'; // สมมติว่าโลโก้อยู่ในไฟล์นี้
// import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

    
export default function SettingSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className="Settingsidebar">
                <h2>Setting</h2>
                <ul className="menu">
                <button
                    onClick={() => navigate('/setting')}
                    className={location.pathname === '/setting' ? 'active' : ''}
                ><ImProfile /> Profile</button>
                    
                    <button
                    onClick={() => navigate('/setting/E-mail&Password')}
                    className={location.pathname === '/setting/E-mail&Password' ? 'active' : ''}
                ><RiLockPasswordFill /> Email & Password</button>
                    
                    <button
                    onClick={() => navigate('/setting/notification')}
                    className={location.pathname === '/setting/notification' ? 'active' : ''}
                ><IoIosNotifications /> Nontification</button>
                </ul>
            </div> 
        </div>
    )
}