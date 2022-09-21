// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./ClassHeader.css";

const ClassHeader = () => {
  const {user} = useSelector((state) => state.AuthReducer.authData)
  const params = useParams();

  return (
    <div className="class-header">
      <nav>
        <NavLink to={`/class/${params.id}/`}>News</NavLink>
        <NavLink to={`/class/${params.id}/everyone/`}>Everyone</NavLink>
      </nav>
    </div>
  );
};

export default ClassHeader;
