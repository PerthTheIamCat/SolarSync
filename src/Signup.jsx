import { React, useState } from 'react';
import "./Signup.css";
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log("password matched");
        } else {
            console.log("password not matched");
        }
        try {
            axios.post('http://localhost:3001/register', {
                email: email,
                password: password
            }).then((response) => {
                console.log(response);
            }).then(() => {
                navigate('/signin');
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="banner"></div>
            <div className="bg-sign-up">
                <div id="container-sign-up">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="input-email">
                            Email:<br />
                            <input id="input-email" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </label>
                        <label htmlFor="input-password">
                            Password:<br />
                            <input id="input-password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password:<br />
                            <input id="confirm-password" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        </label>
                        <button id="SignUp-btn" type="submit">Sign Up</button>
                        <label htmlFor="sign-in">
                            <span>Already have an account? <a id="sign-in" href="/signin">Sign In</a></span>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}