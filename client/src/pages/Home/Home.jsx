import CardSlider from "components/HomePage/CardSlider/CardSlider";
import Diversion from "components/HomePage/Diversion/Diversion";
import Header from "components/HomePage/Header/Header";
import HomeContact from "components/HomePage/HomeContact/HomeContact";
import HomeFooter from "components/HomePage/HomeFooter/HomeFooter";
import IntroContent from "components/HomePage/IntroContent/IntroContent";
import ShortCutNav from "components/HomePage/ShortCutNav/ShortCutNav";
import Slider from "components/HomePage/Slider/Slider";
import React from "react";
import { ToastContainer } from "react-toastify";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <ToastContainer/>
      <div className="hero">
        <div className="left-h">
          <Header />
        </div>
        <div className="right-h">
          <Diversion />
        </div>
      </div>
      <Slider />
      <ShortCutNav />
      <IntroContent />
      <CardSlider />
      <HomeContact />
      <HomeFooter />
    </div>
  );
};

export default Home;
