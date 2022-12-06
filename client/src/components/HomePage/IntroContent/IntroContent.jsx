import React from "react";
import "./IntroContent.css"
import banner from "../../../assets/img/banner.png";

const IntroContent = () => {
  return (
    <div className="introduce">
      <div className="left-int">
        <img src={banner} alt="" />
      </div>
      <div className="right-int">
        <div className="intro-content">
          <span>Introduction</span>
          <p>
            STEM EDUCATION is a clean fullscreen education website template well suited for schools, universities, online courses, and other education-related websites. It comes with a beautiful and well-crafted front page and blog that you can use as a standalone education blog.
          </p>
          <span>-- STEM Education --</span>
        </div>
      </div>
    </div>
  );
};

export default IntroContent;
