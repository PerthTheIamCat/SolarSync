import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

function Home() {
    document.title = "Home";
    const navigate = useNavigate();
    return ( 
        <div id="home-container">
            <Navbar/>
            <div className="HOME relative">
                <div className="banner"></div>
                <h1>LOGO</h1>
                <button className="sign-up-btn" onClick={()=>navigate("/signIn")}>Sign In</button>
            </div> 
            <div className="HOME">
                <h1>Home</h1>
                <p>Welcome to the Home page.</p>
            </div>
        </div>
    );
}

export default Home;