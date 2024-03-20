import React, { useState } from 'react';
import './farmerinfo.scss';
import pic1 from '../../assets/pic1.png';
import progress from '../../assets/progress.png';
import mark from '../../assets/mark.png';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';
import Headerlink from '../headerlink/Headerlink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Step from '../stepper/Stepper';
import userIcon from '../../assets/Vector.svg'
import Icon from '../../assets/Icon.png'
import { useNavigate } from "react-router-dom"
import Button from '../button/Button';



// import { Flag } from 'react-flag-kit';

const Form = () => {
    const [phone, setPhone] = useState();
    const [site, setSite] = useState('')
    const [age, setAge] = useState('');
    const [idtype, setIdtype] = useState('');
    const [gender, setGender] = useState('');
    const [selectedIdType, setSelectedIdType] = useState(null);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [passwordError, setPasswordError] = useState({ length: '', specialChar: '' });
    const [passwordTouched, setPasswordTouched] = useState(false);



    const handlePhoneChange = (value) => {
        setPhone(value);
    };


    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };
    const handleSiteChange = (e) => {
        setSite(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleIdtypeChange = (e) => {
        setIdtype(e.target.value);
        setSelectedIdType(e.target.value);

    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
    };


    // const handlePasswordChange = (e) => {
    //     const value = e.target.value;
    //     setPassword(value);
    //     validatePassword(value);
    // };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordTouched(true);
        validatePassword(value);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const validatePassword = (value) => {
        const isLengthValid = value.length >= 8;
        const containsSpecialChar = /[!@#$%^&*]/.test(value);

        setPasswordError({
            length: isLengthValid ? 'Correct' : 'Must be at least 8 characters long.',
            specialChar: containsSpecialChar ? 'Correct' : 'Must contain at least one special character.'
        });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("../bankdetails", { replace: true })

    }

    const handleGoBack = () => {
        window.history.back()
    };

    return (
        <div className="form-container">
            <div className="image-container">
                <img src={pic1} alt="placeholder" className="image" />
            </div>

            <div className="contact-container">
                <Headerlink />
                <div className="progress-form-container">
                    <img src={progress} alt="placeholder" className="progress" />

                    {/* <Step /> */}

                    <form>
                        <h1>Create Account</h1>
                        <p>Personal Information</p>
                        <div className="name-container">
                            <div>
                                <label htmlFor="firstname">First Name*</label>
                                <input type="text" id="firstname" name="firstname" placeholder='Enter first name' />
                            </div>
                            <div>
                                <label htmlFor="lastname">Last Name*</label>
                                <input type="text" id="lastname" name="lastname" placeholder='Enter last name' />
                            </div>
                        </div>

                        <label htmlFor="phonenumber">Phone Number*</label>
                        <div className="phone-input">
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="NG"
                                value={phone}
                                onChange={handlePhoneChange}
                                inputStyle={{ width: '30%' }}
                            />
                        </div>

                        <label htmlFor="email">Email address <span className='optional'>(optional) </span> </label>
                        <input type="email" id="email" name="email" />

                        <div className="age-gender-container">
                            <div className="age">
                                <label htmlFor="age">Age*</label>
                                <select id="age" name="age" value={age} onChange={handleAgeChange} required>
                                    <option value="">Select age</option>
                                    {ageOptions.map((age) => (
                                        <option key={age} value={age}>
                                            {age}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="gender">
                                <p>Choose Gender*</p>
                                <div className='gender-options'>

                                    <input type="radio" name="gender" value={gender} onChange={handleGenderChange} />
                                    <label htmlFor="gender">Male</label>

                                    <input type="radio" name="gender" value={gender} onChange={handleGenderChange} />
                                    <label htmlFor="gender">Female</label>


                                </div>
                            </div>
                        </div>

                        <label htmlFor="text">Residential Address*</label>
                        <input type="text" id="text" name="text" placeholder='N0 21, Agaro road, Abeokuta' />


                        <label htmlFor="site">Site*</label>
                        <select id="site" name="site" value={site} onChange={handleSiteChange} required>
                            <option value="">Select Site</option>
                            <option value="ajegunle">Ajegunle</option>
                            <option value="egbeda">Egbeda</option>
                            <option value="ikorodu">Ikorodu</option>
                        </select>

                        <label htmlFor="idtype">ID Type*</label>
                        <div className="select-container">
                            <select id="idtype" name="idtype" value={idtype} onChange={handleIdtypeChange} required>
                                <option value="">Select ID Type</option>
                                <option value="NIN">National ID card (NIN)</option>
                                <option value="Voterscard">Voter's card</option>
                                <option value="Intpassport">International Passport</option>
                            </select>
                            {selectedIdType && (
                                <img
                                    src={mark}
                                    alt="mark"
                                    className="mark-icon"
                                />
                            )}
                        </div>


                        <label htmlFor="file">Upload ID document</label>
                        <input type="file" id="file" name="file" onChange={handleFileUpload} />

                        <label htmlFor="passowrd">Create Password</label>

                        <div className="createpassword">

                            <input type={showPassword ? "text" : "password"}
                                placeholder='Password' value={password}
                                onChange={handlePasswordChange}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                                onClick={toggleShowPassword}
                                className='create-password' />

                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEye : faEyeSlash}
                                onClick={toggleShowConfirmPassword}
                                className='confirm-password'
                            />
                        </div>

                        {passwordTouched && (
                            <>
                                <div className={`error-message ${passwordError.length === 'Correct' ? 'correct' : 'incorrect'}`}>
                                    {passwordError.length}
                                </div>
                                <div className={`error-message ${passwordError.specialChar === 'Correct' ? 'correct' : 'incorrect'}`}>
                                    {passwordError.specialChar}
                                </div>
                            </>
                        )}

                        <div className="profile-section" >
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile Preview"
                                />
                            ) : (
                                <img
                                    src={userIcon}
                                    alt="Default Profile"
                                />
                            )}

                            <label htmlFor="upload-button" className="file-upload">
                                <img src={Icon} alt="" />
                                {profileImage ? "Change picture" : "Upload picture"}
                            </label>
                            <input
                                id="upload-button"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                        </div>

                        <Button backRoute="/" continueRoute="/bankdetails" />

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Form;

