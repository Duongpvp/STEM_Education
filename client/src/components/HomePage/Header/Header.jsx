import React from "react";
import "./Header.css";
import Logo from "../../../assets/img/Logo_Education.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="link" to="/">
        <img src={Logo} alt="LogoSign" className="logo" />
      </Link>

      <ul className="header-menu">
        <li>
          <Link className="link" to="/home/about">
            About us
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/deanboard">
            Dean board
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/department">
            Department
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/studyprograms">
            Study Programs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
