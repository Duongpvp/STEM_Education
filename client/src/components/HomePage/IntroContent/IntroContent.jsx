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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, ab!
            Obcaecati necessitatibus mollitia animi tempore quibusdam quo
            deserunt ipsum voluptatum consectetur adipisci, aut nulla quae
            facilis aspernatur nobis eligendi ullam?
          </p>
          <span>-- STEM Education --</span>
        </div>
      </div>
    </div>
  );
};

export default IntroContent;
