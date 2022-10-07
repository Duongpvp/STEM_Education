import React from "react";
import "./NoticeSide.css";
import { Icon } from "@iconify/react";
import TrendCard from "../TrendCard/TrendCard.jsx";
import { Link } from "react-router-dom";
const NoticeSide = () => {
  return (
    <div className="NoticeSide">
      <div className="navIcon">
        <Link to="/media">
          <Icon icon="ant-design:home-outlined" />
        </Link>
        <Icon icon="ant-design:setting-outlined" style={{cursor: "not-allowed"}}/>
        <Icon icon="fe:notice-active" style={{cursor: "not-allowed"}}/>
        <Link to="/chat">
          <Icon icon="bx:comment-dots" />
        </Link>
      </div>
      <TrendCard />
      <button className="btn Post-btn">Share</button>
    </div>
  );
};

export default NoticeSide;
