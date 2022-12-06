import { Icon } from "@iconify/react";
import React from "react";
import footerBackground from "../../../assets/img/footerBackground.png";
import Logo from "../../../assets/img/Logo_Education.png";
import "./HomeFooter.css";

const HomeFooter = () => {
  return (
    <div className="home-footer">
      <div className="footer-content">
        <div className="flex-1">
          <img src={Logo} alt="" />
          <p>
            With a mission to provide an effective teaching and learning
            environment, STEM Education is happy to acknowledge the sincere
            contributions of everyone.
          </p>
        </div>
        <div className="flex-2">
          <ul>
            Connect with us
            <li>Phone: (+84) 766944442</li>
            <li>Email: duong891109@gmail.com</li>
            <li>Address: ĐVC - AT - BT - Can Tho</li>
          </ul>
        </div>
        <div className="flex-3">
          <span className="address-info">
            <ul>
              School
              <li>
                College of Information & Communication Technology- Can Tho
                University
              </li>
              <li>
                Address: 3/2 Street, Ninh Kieu District, Can Tho City, Vietnam
              </li>
              <li>Phone: 84 0292 3 734713 - 0292 3 831301</li>
              <li>Fax: 84 0292 3830841</li>
              <li>Email: webmaster@cit.ctu.edu.vn</li>
            </ul>
          </span>
        </div>
      </div>
      <img src={footerBackground} alt="" />
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <div className="wave box">
        <div className="social-icon">
          <Icon icon="akar-icons:facebook-fill" width="35" height="35" />
          <Icon icon="fa:youtube-square" width="35" height="35" />
          <Icon
            icon="ant-design:twitter-circle-filled"
            width="35"
            height="35"
          />
          <Icon
            icon="entypo-social:linkedin-with-circle"
            width="35"
            height="35"
          />
        </div>
        <p>
          STEM Education © 2022 - 2032 Privacy Policy Cookies Policy Terms of
          Use
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
