// @ts-nocheck
import { logOut } from "actions/AuthAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Diversion.css";

const Diversion = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  console.log(user.profilePicture);

  return (
    <div className="diversion">
      <div className="controller">
        {user ? (
          <div className="profile-state">
            <div className="profile-card">
              <div className="profile-avatar">
                <img
                  src={
                    user.outsideId
                      ? user.profilePicture
                      : user.profilePicture
                      ? serverPublicFolder + user.profilePicture
                      : serverPublicFolder + "DefaultAvatar.png"
                  }
                  alt=""
                  className="avatar"
                  onClick={() => setIsOpenMenu((prev) => !prev)}
                />
                {isOpenMenu && (
                  <ul className="direct-menu">
                    <li>
                      <Link className="link" to={`/profile/${user._id}`}>
                        PROFILE
                      </Link>
                    </li>

                    <li onClick={handleLogOut}>LOGOUT</li>
                  </ul>
                )}
                <Link className="link" to="/profile"></Link>
              </div>
              <div className="profile-info">
                <span>Hello {user.lastname} !</span>
                <span>
                  Role:{" "}
                  {user.isAdmin
                    ? "Admin"
                    : user.isTeacher
                    ? "Teacher"
                    : "Student"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button>Login</button>
        )}
      </div>
      <div className="slide-menu"></div>
    </div>
  );
};

export default Diversion;
