import React, { useEffect, useState } from 'react';
import './verification.scss';
import pic5 from '../../assets/pic5.png';
import Headerlink from '../../components/headerlink/Headerlink';
import verificationRequiredIcon from '../../assets/verificationRequiredIcon.svg';
import verificationSuccessfulIcon from '../../assets/verificationSuccessfulIcon.svg';
import approvalPendingIcon from '../../assets/approvalPendingIcon.svg';


const Verification = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
    const [verificationStatus, setVerificationStatus] = useState('Verification Required');
    const inputRefs = [];
    const [phoneNumber, setPhoneNumber] = useState('');



    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (/^\d{0,1}$/.test(value)) {
            const updatedVerificationCode = [...verificationCode];
            updatedVerificationCode[index] = value;
            setVerificationCode(updatedVerificationCode);

            if (index < inputRefs.length - 1 && value !== '') {
                inputRefs[index + 1].focus();
            }
        }
    };

    const handleContinue = () => {
        setVerificationStatus('Verification Successful');
    };

    const resendVerificationCode = () => {
    };

    const handleGoToDashboard = () => {

        setVerificationStatus('Approval Pending');
    };

    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
        }
    }, []);

    return (
        <div className="verification-container">
            <div className="verification-image-container">
                <img src={pic5} alt="Verification" className='verfication-image' />
            </div>
            <div className="verification-form-container">
                <Headerlink />
                <div className="verification-form">
                    {verificationStatus === 'Verification Required' && (
                        <img src={verificationRequiredIcon} alt="Verification Icon" className='verification-icon' />
                    )}
                    {verificationStatus === 'Verification Successful' && (
                        <img src={verificationSuccessfulIcon} alt="Verification Icon" className='verification-icon' />
                    )}
                    {verificationStatus === 'Approval Pending' && (
                        <img src={approvalPendingIcon} alt="Approval Pending Icon" className='verification-icon' />
                    )}

                    <h2>{verificationStatus}</h2>
                    {verificationStatus === 'Verification Required' && (
                        <>
                            {phoneNumber && (
                                <p>A 5 digit verification code has been sent to {phoneNumber}</p>
                            )}
                            <h4>Enter verification code</h4>
                            <div className="verification-inputs">
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e)}
                                        ref={(ref) => inputRefs[index] = ref}
                                    />
                                ))}
                            </div>
                            <button className='continue-btn' onClick={handleContinue}>Continue</button>
                            <h4 className='no-code'>Didn't receive the code? <span onClick={resendVerificationCode}>click to resend</span></h4>
                        </>
                    )}
                    {verificationStatus === 'Verification Successful' && (
                        <>
                            <p>Your account has been verified, you can now proceed to the dashboard</p>
                            <button className='continue-btn' onClick={handleGoToDashboard}>Go to Dashboard</button>
                            <p>You can explore different products in FWH Marketplace</p>
                            <button className='marketplace-btn'>Go to Marketplace</button>
                        </>
                    )}
                    {verificationStatus === 'Approval Pending' && (
                        <>
                            <p>You will gain full access to dashboard upon successful approval</p>
                            <button className='continue-btn'>Go to Marketplace</button>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Verification;


