import React, { useState } from 'react';
import "./Signin.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn({ onCloseSignIn, onOpenSignUp }) { // Accept props for controlling popups
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const navigate = useNavigate();

    async function sha256Hash(msg) {
        const data = new TextEncoder().encode(msg); 
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
        return Array.from(new Uint8Array(hashBuffer))
                     .map(b => b.toString(16).padStart(2, '0')).join(''); 
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
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    const handleBackgroundClick = () => {
        setIsPopupVisible(false); // Close popup on background click
        onCloseSignIn(); // Call function to close sign-in popup in parent
    };

    return (
        <div className={`bg-sign-in ${isPopupVisible ? 'visible' : 'hidden'}`} onClick={handleBackgroundClick}>
            {isPopupVisible && (
                <div id="container-sign-in" onClick={(e) => e.stopPropagation()}>
                    <h1>Sign In</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="input-email">
                            Email:<br />
                            <input 
                                id="input-email" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </label>
                        <label htmlFor="input-password">
                            Password:<br />
                            <input 
                                id="input-password" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </label>
                        <label htmlFor="forgot-password">
                            <a id="forgot-password" href="/">Forgot password?</a>
                        </label>
                        <button id="SignIn-btn" type="submit">Sign In</button>
                        <label htmlFor="sign-up">
                            <span>Don't have an account? 
                                <a onClick={() => {
                                    onCloseSignIn(); // Close Sign In popup
                                    onOpenSignUp(); // Open Sign Up popup
                                }}>
                                    Sign Up
                                </a>
                            </span>
                        </label>
                    </form>
                </div>
            )}
        </div>
    );
}
