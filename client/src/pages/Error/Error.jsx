// @ts-nocheck
import React from 'react'
import Error404 from "../../assets/img/404.png"
import WaterColor from "../../assets/img/watercolor.png"
import "./Error.css"

const Error = () => {
  return (
    <div className='error'>
        <img src={Error404} alt="" />
        <div className="error-container">
            <div className="error-left-side">
                <span>404</span>
                <b>PAGE NOT FOUND</b>
                <hr />
                <p>The page you are looking for might have been removed has its name changed or is temporarily unavailable !</p>
                <button class="button-63" role="button">Go to homepage</button>
            </div>
            <div className="error-right-side">
                <img src={WaterColor} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Error