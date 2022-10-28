// @ts-nocheck
import { userOnline } from "actions/UserAction";
import CardSlider from "components/HomePage/CardSlider/CardSlider";
import Diversion from "components/HomePage/Diversion/Diversion";
import Header from "components/HomePage/Header/Header";
import HomeContact from "components/HomePage/HomeContact/HomeContact";
import HomeFooter from "components/HomePage/HomeFooter/HomeFooter";
import IntroContent from "components/HomePage/IntroContent/IntroContent";
import ShortCutNav from "components/HomePage/ShortCutNav/ShortCutNav";
import Slider from "components/HomePage/Slider/Slider";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import "./Home.css";

const Home = () => {
  const socket = useRef();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.AuthReducer.authData);
  const onlineUser = useSelector((state) => state.UserReducer.onlineUser);

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_URL_SOCKET_LOCAL}`);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      for (var i = 0; i < onlineUser.length; i++) {
        if (onlineUser[i].userId === users) {
          return;
        } else {
          dispatch(userOnline(users));
        }
      }
    });
  }, [user]);

  return (
    <div className="home">
      <ToastContainer />
      <div className="hero">
        <div className="left-h">
          <Header />
        </div>
        <div className="right-h">
          <Diversion />
        </div>
        <Slider />
        <ShortCutNav />
      </div>
      <IntroContent />
      <CardSlider />
      <HomeContact />
      <HomeFooter />
    </div>
  );
};

export default Home;
