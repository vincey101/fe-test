import React, { useState } from 'react';
import './bankdetails.scss'
import pic2 from '../../assets/pic2.png';
import Headerlink from '../headerlink/Headerlink';
import Button from '../button/Button';


const Bankdetails = () => {
    const [showBankFields, setShowBankFields] = useState(false); 




    const handleBankRadioChange = (event) => {
        setShowBankFields(event.target.value === "bank" && event.target.checked);
    };



    return (
        <div className="container">
            <div className="image-container">
                <img src={pic2} alt="Image" className='bankdetails-image' />
            </div>
            <div className="radio-container">
                <Headerlink />
                <div className="account-container">
                    <h2>Create Account</h2>
                    <p>Bank Details</p>

                    <p>Do you have a Smartphone?</p>
                    <div className="smartphone-radio">
                        <input type="radio" id="smartphone" name="smartphone" value="smartphone" />
                        <label htmlFor="smartphone">Yes</label>
                        <input type="radio" id="smartphone1" name="smartphone" value="smartphone" />
                        <label htmlFor="smartphone">No</label>

                    </div>

                    <p>Do you have a Bank account?</p>

                    <div className="bank-radio">
                        <input type="radio" id="bank" name="bank" value="bank" onChange={handleBankRadioChange} />
                        <label htmlFor="bank">Yes</label>
                        <input type="radio" id="bank1" name="bank" value="no_bank" onChange={handleBankRadioChange} />
                        <label htmlFor="bank1">No</label>
                    </div>

                    {showBankFields && (
                        <div className="bank-fields">

                            <label htmlFor="bank-name">Select Bank*</label>
                            <div className="bank-name">
                                <select>
                                    <option value="">Select Bank</option>
                                    <option value="zenith">Zenith Bank</option>
                                    <option value="access">Access Bank</option>
                                    <option value="wema">Wema Bank</option>
                                    <option value="keystone">Keystone Bank</option>
                                    <option value="gtb">Guarantee Trust Bank</option>
                                    <option value="uba">UBA</option>
                                    <option value="polaris">Polaris</option>
                                </select>
                            </div>

                            <label htmlFor="bankAccountNumber">Personal Bank Account Number*</label>
                            <div className="">

                                <input type="text" className="bank-number" />
                            </div>


                        </div>
                    )}

                    <Button backRoute="/" continueRoute="/security" />


                </div>
            </div>
        </div>
    );
};

export default Bankdetails;



