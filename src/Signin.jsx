import { React , useState } from 'react';
import "./Signin.css";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function sha256Hash(msg) {
        const data = new TextEncoder().encode(msg); 
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
        return Array.from(new Uint8Array(hashBuffer))
                     .map(b => b.toString(16).padStart(2, '0')).join(''); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await sha256Hash(password);
            axios.post('http://localhost:3001/login', {
                email: email,
                password: hashedPassword
            }).then((response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
            }).then(() => {
                navigate('/');
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
        <div className="bg-sign-in">
            <div id="container-sign-in">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-email">
                        Email:<br />
                        <input id="input-email" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </label>
                    <label htmlFor="input-password">
                        Password:<br />
                        <input id="input-password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </label>
                    <label htmlFor="forgot-password">
                        <a id="forgot-password" href="/">Forgot password?</a>
                    </label>
                    <button id="SignIn-btn" type="submit">Sign In</button>
                    <label htmlFor="sign-up">
                        <span>Don't have an account? <a id="sign-up" href="/signup">Sign Up</a></span>
                    </label>
                </form>
            </div>
        </div>
        </div>
    )
}