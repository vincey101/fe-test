import React from 'react'
import './button.scss'
import { useNavigate } from 'react-router-dom';



function Button({ onClick, backRoute, continueRoute, setPhoneNumber }) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (backRoute) {
            navigate(backRoute);
        } else {
            window.history.back();
        }
    };

    const handleContinue = () => {
        // if (continueRoute) {
        //     navigate(continueRoute);
        // } else {
        //     if (onClick) onClick();
        // }

        if (continueRoute) {
            // if (setPhoneNumber) setPhoneNumber();
            navigate(continueRoute);
        } else {
            if (onClick) onClick();
        }
    };

    return (
        <div className='button-section'>

            <button className='back' type="button" onClick={handleGoBack}>Back</button>
            <button className='continue' type="button" onClick={handleContinue}>Continue</button>
        </div>
    )
}

export default Button