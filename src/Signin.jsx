import React from 'react';
import "./Signin.css";
import Navbar from './Navbar';

export default function SignIn() {
    return (
        <div>
            <Navbar />
            <div className="banner"></div>
        <div className="bg-sign-in">
            <div id="container-sign-in">
                <h1>Sign In</h1>
                <form>
                    <label htmlFor="input-email">
                        Email:<br />
                        <input id="input-email" type="email" />
                    </label>
                    <label htmlFor="input-password">
                        Password:<br />
                        <input id="input-password" type="password" />
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