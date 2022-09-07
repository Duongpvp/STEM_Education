// @ts-nocheck

import React from "react";
import { useSelector } from "react-redux";
import "./UserCard.css";

const UserCard = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  return (
    <div className="user-card">
      <div className="user-profile">
        <img
          src={
            user.profilePicture
              ? serverPublicFolder + user.profilePicture
              : serverPublicFolder + "DefaultAvatar.png"
          }
          alt="ProfilePicture"
        />
      </div>

      <div className="user-info">
        <span>
          <b>User</b>: {user.firstname} {user.lastname}
        </span>
        <span>
          <b>Email </b> : {user.username}
        </span>
        <span>
          <b>Role</b> : Admin
        </span>
      </div>
    </div>
  );
};

export default UserCard;
