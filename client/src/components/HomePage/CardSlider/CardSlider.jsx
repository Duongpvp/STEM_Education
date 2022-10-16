// @ts-nocheck
import { FeatureData } from "Data/FeaturesData";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./CardSlider.css";

const CardSlider = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      }
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowDimensions;
  }
  
  const { height, width } = useWindowDimensions();

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: (width <= 1023 && width > 940) ? 2 : (width <= 940) ? 1 : 3,
    speed: 500,
  };

  return (
    <div>
      <div className="container">
        <h1 className="header-slider">Center mode</h1>
        <Slider {...settings}>
          {FeatureData.map((item) => (
            <div key={item.id}>
              <img src={item.linkImg} className="slide" />
              <div className="slide-nav">
                <h3 className="slide-title">{item.title}</h3>
                <h4 className="slide-content">{item.content}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardSlider;
