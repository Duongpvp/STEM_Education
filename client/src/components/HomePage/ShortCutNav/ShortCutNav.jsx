// @ts-nocheck
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import "./ShortCutNav.css";
import { Link } from "react-router-dom";

const ShortCutNav = () => {
  
  return (
    <div className="shortcut-nav">
      <ul>
        <li className="list active">
          <Link to = "/home">
            <div className="icon">
              <HomeOutlinedIcon fontSize="large" />
            </div>
            <div className="text">Home</div>
          </Link>
        </li>
        <li className="list">
          <Link to = "/class">
            <div className="icon">
              <SchoolOutlinedIcon fontSize="large" />
            </div>
            <div className="text">Class</div>
          </Link>
        </li>
        <li className="list">
          <Link to = "/chat">
            <div className="icon">
              <MarkUnreadChatAltOutlinedIcon fontSize="large" />
            </div>
            <div className="text">Chat</div>
          </Link>
        </li>
        <li className="list">
          <Link to = "/media">
            <div className="icon">
              <HubOutlinedIcon fontSize="large" />
            </div>
            <div className="text">Media</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ShortCutNav;
