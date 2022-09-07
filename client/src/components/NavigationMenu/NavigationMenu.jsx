// @ts-nocheck
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";

const NavigationMenu = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`hash-menu ${isActive ? "active" : ""}`}>
      <div className="toggle" onClick={handleClick}>
        <Icon icon="carbon:add" />
      </div>
      <li style={{ "--i": 0 }}>
        <Link to="/home">
          <Icon icon="clarity:home-line" />
        </Link>
      </li>
      <li style={{ "--i": 1 }}>
        <Link to="/home/studyprograms">
          <Icon icon="material-symbols:energy-program-time-used" />
        </Link>
      </li>
      <li style={{ "--i": 2 }}>
        <Link to="/home/department">
          <Icon icon="mingcute:department-line" />
        </Link>
      </li>
      <li style={{ "--i": 3 }}>
        <Link to="/home/deanboard">
          <Icon icon="carbon:user-multiple" />
        </Link>
      </li>
      <li style={{ "--i": 4 }}>
        <Link to="/home/about">
          <Icon icon="fluent:people-team-20-regular" />
        </Link>
      </li>
      <li style={{ "--i": 5 }}>
        <Link to="/media">
          <Icon icon="icon-park-outline:connect" />
        </Link>
      </li>
      <li style={{ "--i": 6 }}>
        <Link to="/class">
          <Icon icon="ph:student" />
        </Link>
      </li>
      <li style={{ "--i": 7 }}>
        <Link to="/chat">
          <Icon icon="bi:chat" />
        </Link>
      </li>
    </div>
  );
};

export default NavigationMenu;
