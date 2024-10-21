import React from 'react';
import "./Signup.css";
import Navbar from './Navbar';
export default function SignUp() {
    return (
        <div>
            <Navbar />
            <div className="banner"></div>
            <div className="bg-sign-up">
                <div id="container-sign-up">
                    <h1>Sign Up</h1>
                    <form>
                        <label htmlFor="input-email">
                            Email:<br />
                            <input id="input-email" type="email" />
                        </label>
                        <label htmlFor="input-password">
                            Password:<br />
                            <input id="input-password" type="password" />
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password:<br />
                            <input id="confirm-password" type="password" />
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