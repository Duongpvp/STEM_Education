import React from "react";
import { Link } from "react-router-dom";
import "./FlashUserCard.css";

const FlashUserCard = ({ user }) => {
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  return (
    <div className="flash-user-card">
      <img
        src={
          user.profilePicture
            ? serverPublicFolder + user.profilePicture
            : serverPublicFolder + "DefaultAvatar.png"
        }
        alt="avatar"
      />
      <span>Name: {user.lastname}</span>
      <span>{user.username}</span>
      <div className="FollowStatus">
        <hr />
        <div>
          <div className="Follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="split-col"> </div>
          <div className="Follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
        <Link to={`/profile/${user._id}`}>Profile</Link>
      </div>
    </div>
  );
};

export default FlashUserCard;
