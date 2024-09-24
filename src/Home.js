import React from 'react';
import './Home.css';

function Home() {
    document.title = "Home";
    return ( 
        <>
            <div className="HOME">
                <h1>LOGO</h1>
                <button className="sign-up-btn">Sign In</button>
            </div> 
            <div className="HOME">
                <h1>Home</h1>
                <p>Welcome to the Home page.</p>
            </div>
        </>
    );
}

export default Home;