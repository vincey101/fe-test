import React, { useState } from 'react';
import './login.scss';
import pic6 from '../../assets/pic6.png';
import thumb from '../../assets/fingerprint3.svg';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if (!email) {
            setEmailError('This email is not verified');
        }

        if (!password) {
            setPasswordError('Wrong password');
        }

        // Perform login logic here
    };

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img src={pic6} alt="login" className='login-image' />
            </div>
            <div className="login-form-container">
                <a href="/">&lt; Back home</a>
                <div className="login-form">
                    <h2>Welcome Back!</h2>
                    <p className='welcome-text'>Welcome back! Please enter your details</p>

                    <div className="login-inputs">
                        <div className={`form-group ${emailError ? 'error' : ''}`}>
                            <label htmlFor="email">Email address/Phone number</label>
                            <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder='Enter email or phone number' />
                            <p className='error-message'>{emailError}</p>
                            <p className='num-text'>Phone number must have country code. E.g. +234.</p>
                        </div>
                        <div className={`form-group ${passwordError ? 'error' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <div className="password-section">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={handlePasswordChange} placeholder='Enter password' className='password-field' />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    onClick={toggleShowPassword}
                                    className='show-password' />
                                <img src={thumb} alt="" className='thumb' />
                            </div>
                            <p className='error-message'>{passwordError}</p>
                        </div>
                        <div className="form-group checkbox-group">
                            <label>
                                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                                <span className='rem-text'>Remember for 30 days</span>
                            </label>
                            <span className='forgot-password'>Forgot password</span>
                        </div>
                    </div>

                    <button className='login-btn' onClick={handleLogin}>Login</button>
                    <p className='signup-text'>Don't have an account? <a href="/">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
