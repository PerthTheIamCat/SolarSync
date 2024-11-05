import React, { useState } from 'react';
import "./Signin.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn({ onCloseSignIn, onOpenSignUp, setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function sha256Hash(msg) {
        const data = new TextEncoder().encode(msg); 
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const hashedPassword = await sha256Hash(password);
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: hashedPassword
            });
            console.log(response);
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            onCloseSignIn();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    const handleBackgroundClick = () => {
        onCloseSignIn();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage(''); // Clear error message on input change
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage(''); // Clear error message on input change
    };

    return (
        <div className="bg-sign-in" onClick={handleBackgroundClick}>
            <div id="container-sign-in" onClick={(e) => e.stopPropagation()}>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-email">
                        Email:<br />
                        <input 
                            id="input-email" 
                            type="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                        />
                    </label>
                    <label htmlFor="input-password">
                        Password:<br />
                        <input 
                            id="input-password" 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                        />
                    </label>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button id="SignIn-btn" type="submit" >Sign In</button>
                    <label htmlFor="sign-up">
                        <span>Don't have an account? 
                            <a onClick={() => {
                                onCloseSignIn();
                                onOpenSignUp();
                            }}>
                                Sign Up
                            </a>
                        </span>
                    </label>
                </form>
            </div>
        </div>
    );
}
