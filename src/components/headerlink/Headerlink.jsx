import React from 'react'
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
                    <a className='login' href="/login"> Log in</a>
                </div>
            </div>
        </div>
    )
}

export default Headerlink