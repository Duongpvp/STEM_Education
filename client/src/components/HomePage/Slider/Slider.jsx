// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Slider.css";

const Slider = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  return (
    <div className="slider-home">
      <div className="slogan">
        <span>Education is essential</span>
        <span>for building</span>
        <span>a better tomorrow for you</span>
      </div>
      <Link
        to={
          (user && user.isTeacher) || (user && user.isAdmin)
            ? "../classmanagement"
            : "../class"
        }
      >
        <button className="join-btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Slider;
