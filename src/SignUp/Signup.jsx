import { React, useState } from 'react';
import "./Signup.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
    // Destructure onCloseSignUp and onOpenSignIn from props
    const { onCloseSignUp, onOpenSignIn, isVisible } = props; 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function sha256Hash(msg) {
        const data = new TextEncoder().encode(msg); 
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match."); // Set error message if passwords don't match
            return;
        }
        setErrorMessage(''); // Reset error message before making the request

        try {
            const hashedPassword = await sha256Hash(password);
            await axios.post('http://localhost:3001/register', {
                email: email,
                password: hashedPassword
            });
            await axios.post('http://localhost:3001/login', {
                email: email,
                password: hashedPassword
            }).then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate('/');
                window.location.reload();
            });
            onCloseSignUp(); // Close the sign-up popup
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to register. Please try again.'); // Set error message for registration failure
        }
    }

    const handleBackgroundClick = () => {
        onCloseSignUp(); // Close popup on background click
    };

    return (
        <div className={`bg-sign-up ${isVisible ? 'visible' : 'hidden'}`} onClick={handleBackgroundClick}>
            <div id="container-sign-up" onClick={(e) => e.stopPropagation()}>
                <h1>Sign Up</h1> 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-email">
                        Email:<br />
                        <input id="input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="input-password">
                        Password:<br />
                        <input id="input-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label htmlFor="confirm-password">
                        Confirm Password:<br />
                        <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button id="SignUp-btn" type="submit">Sign Up</button>
                    <label htmlFor="sign-in">
                        <span>Already have an account? 
                            <a onClick={() => {
                                onCloseSignUp(); // Close Sign Up popup
                                onOpenSignIn(); // Open Sign In popup
                            }}>
                                Sign In
                            </a>
                        </span>
                    </label>
                </form>
            </div>
        </div>
    );
}
