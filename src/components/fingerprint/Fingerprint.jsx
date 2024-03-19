import React, { useState } from 'react';
import './fingerprint.scss';
import pic3 from '../../assets/pic3.png'
import Headerlink from '../headerlink/Headerlink';
import leftThumb from '../../assets/fingerprint1.svg'
import leftIndex from '../../assets/fingerprint2.svg'
import Button from '../button/Button';

const Fingerprint = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };




    return (
        <div className="container">
            <div className="image-container">
                <img src={pic3} alt="Image" className='security-image' />
            </div>
            <div className="text-container">
                <Headerlink />
                <div className="create-account">
                    <h2>Create Account</h2>
                    <h4>Security-Setup Fingerprint (Optional)</h4>
                    <p>Capture Fingerprint(Your L-R Index fingers)</p>

                    <div className="fingerprints">
                        <div className="">
                            <img src={leftThumb} alt="" />
                            <p>Left thumb</p>

                        </div>
                        <div className="">
                            <img src={leftIndex} alt="" />
                            <p>Left index</p>
                        </div>
                        <div className="">
                            <img src={leftThumb} alt="" />
                            <p>Right thumb</p>
                        </div>
                        <div className="">
                            <img src={leftIndex} alt="" />
                            <p>Right index </p>
                        </div>
                    </div>

                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="skipCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="skipCheckbox">Skip for now</label>
                    </div>


                    <Button backRoute='/bankdetails' continueRoute='/farm' />
                </div>
            </div>
        </div>
    );
};

export default Fingerprint;
