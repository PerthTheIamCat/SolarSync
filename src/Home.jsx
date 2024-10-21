import React from 'react';
import './Home.css';
import axios from 'axios';

const URL = "http://localhost:3001";

function getData() {
    axios.get(URL+"/data")
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
}

function Home() {
    document.title = "Home";
    return ( 
        <>
            <div className="HOME">
                <h1>LOGO</h1>
                <button className="sign-up-btn" onClick={getData}>Sign In</button>
            </div> 
            <div className="HOME">
                <h1>Home</h1>
                <p>Welcome to the Home page.</p>
            </div>
        </>
    );
}

export default Home;