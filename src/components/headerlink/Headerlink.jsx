import React from 'react'
import { Link } from 'react-router-dom';
import './headerlink.scss'
const Headerlink = () => {
    return (
        <div className="headerlinks">
            <div className="links">
                <div className="">
                    <a href="/">&lt; Back home</a>
                </div>
                <div className='account'>
                    <p>Already have an account?</p>
                    <Link className='login' to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Headerlink