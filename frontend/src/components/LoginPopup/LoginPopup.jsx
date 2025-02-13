import React, { useContext, useState } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    };

    const handleGoogleLoginSuccess = (googleToken) => {
        // Send the googleToken to the backend for verification
        axios.post(`${url}/api/auth/google-login`, { token: googleToken })
            .then((res) => {
                if (res.data.success) {
                    setToken(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    setShowLogin(false); // Close login popup
                } else {
                    alert('Google login failed');
                }
            })
            .catch((error) => {
                console.log('Error during Google login:', error);
                alert('An error occurred while logging in');
            });
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login error:', error);
        alert('Google login failed');
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src="assets/cross_icon.png" alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
                </div>

                <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }

                {/* Google Sign-In Button */}
                <GoogleSignIn
                    onLoginSuccess={handleGoogleLoginSuccess}
                    onLoginFailure={handleGoogleLoginFailure}
                />
            </form>
        </div>
    );
};

export default LoginPopup;
