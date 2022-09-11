import React from "react";
import { NavLink } from "react-router-dom";
import "./ClassHeader.css";

const ClassHeader = () => {
  return (
    <div className="class-header">
      <nav>
        <NavLink to="./">News</NavLink>
        <NavLink to="./everyone">Everyone</NavLink>
      </nav>
    </div>
  );
};

export default ClassHeader;
