// @ts-nocheck
import { followUser, unFollowUser } from "actions/UserAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const serverPublic = process.env.REACT_APP_FOLDER;

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div>
      <div className="Followers">
        <div>
          <img
            src={
              person.outsideId
                ? person.profilePicture
                : person.profilePicture
                ? serverPublic + person.profilePicture
                : serverPublic + "DefaultAvatar.png"
            }
            alt=""
            className="FollowerImg"
          />
          <div className="FollowerName">
            <span>{person.lastname}</span>
            <span>{person.username}</span>
          </div>
        </div>
        <button
          className={following ? "UnFollow-btn" : "Follow-btn"}
          onClick={handleFollow}
        >
          {following ? "UnFollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default User;
