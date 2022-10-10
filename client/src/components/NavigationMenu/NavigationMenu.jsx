// @ts-nocheck
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

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
        <Tooltip title="Home" placement="bottom">
          <Link to="/home">
            <Icon icon="clarity:home-line" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 1 }}>
        <Tooltip title="Study Programs" placement="bottom">
          <Link to="/home/studyprograms">
            <Icon icon="material-symbols:energy-program-time-used" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 2 }}>
        <Tooltip title="Department" placement="bottom">
          <Link to="/home/department">
            <Icon icon="mingcute:department-line" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 3 }}>
        <Tooltip title="Dean Board" placement="bottom">
          <Link to="/home/deanboard">
            <Icon icon="carbon:user-multiple" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 4 }}>
        <Tooltip title="About" placement="bottom">
          <Link to="/home/about">
            <Icon icon="fluent:people-team-20-regular" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 5 }}>
        <Tooltip title="Media" placement="bottom">
          <Link to="/media">
            <Icon icon="icon-park-outline:connect" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 6 }}>
        <Tooltip title="Class" placement="bottom">
          <Link to="/class">
            <Icon icon="ph:student" />
          </Link>
        </Tooltip>
      </li>
      <li style={{ "--i": 7 }}>
        <Tooltip title="Chat" placement="bottom">
          <Link to="/chat">
            <Icon icon="bi:chat" />
          </Link>
        </Tooltip>
      </li>
    </div>
  );
};

export default NavigationMenu;
