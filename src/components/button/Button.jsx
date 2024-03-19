import React from 'react'
import './button.scss'
import { useNavigate } from 'react-router-dom';



function Button({ onClick, backRoute, continueRoute }) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (backRoute) {
            navigate(backRoute);
        } else {
            window.history.back();
        }
    };

    const handleContinue = () => {
        if (continueRoute) {
            navigate(continueRoute);
        } else {
            if (onClick) onClick();
        }
    };

    return (
        <div className='button-section'>

            <button className='back' type="submit" onClick={handleGoBack}>Back</button>
            <button className='continue' type="submit" onClick={handleContinue}>Continue</button>
        </div>
    )
}

export default Button