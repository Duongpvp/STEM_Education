// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./ClassHeader.css";

const ClassHeader = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const params = useParams();
  console.log(user);
  return (
    <div className="class-header">
      <nav>
        {(user && user.isTeacher) || (user && user.isAdmin) ? (
          <>
            <NavLink to={`/classmanagement/${params.id}/`}>News</NavLink>

            <NavLink to={`/classmanagement/${params.id}/everyone/`}>
              Everyone
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={`/class/${params.id}/`}>News</NavLink>
            <NavLink to={`/class/${params.id}/everyone/`}>Everyone</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default ClassHeader;
