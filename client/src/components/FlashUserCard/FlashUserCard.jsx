// @ts-nocheck
import { followUser, unFollowUser } from "actions/UserAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FlashUserCard.css";

const FlashUserCard = ({ user }) => {
  const userReducer = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const [following, setFollowing] = useState(
    user.followers.includes(userReducer.user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(user._id, userReducer.user))
      : dispatch(followUser(user._id, userReducer.user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="flash-user-card">
      <img
        src={
          user.outsideId
            ? user.profilePicture
            : user.profilePicture
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
        {user._id !== userReducer.user._id && (
          <button
            className={following ? "UnFollow-btn" : "Follow-btn"}
            onClick={handleFollow}
          >
            {!following ? "Follow" : "UnFollow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashUserCard;
