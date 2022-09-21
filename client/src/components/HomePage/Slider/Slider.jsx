import React from "react";
import { Link } from "react-router-dom";
import "./Slider.css";

const Slider = () => {
  return (
    <div className="slider-home">
      <div className="slogan">
        <span>Education is essential</span>
        <span>for building</span>
        <span>a better tomorrow for you</span>
      </div>
      <Link to="../class">
        <button className="join-btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Slider;
