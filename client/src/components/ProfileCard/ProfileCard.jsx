// @ts-nocheck
import React from "react";
import "./ProfileCard.css";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ user, location }) => {
  // const { user } = useSelector((state) => state.AuthReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user?.coverPicture
              ? serverPublicFolder + user.coverPicture
              : serverPublicFolder + "DefaultBackground.png"
          }
          alt="Cover - Background Wallpaper"
        />
        <img
          src={
            user?.profilePicture
              ? serverPublicFolder + user.profilePicture
              : serverPublicFolder + "DefaultAvatar.png"
          }
          alt="Avatar"
        />

        <div className="ProfileName">
          <span>
            {user?.firstname} {user?.lastname}
          </span>
          <span>{user?.workAt ? user?.workAt : "Write something ..."}</span>
        </div>

        <div className="FollowStatus">
          <hr />
          <div>
            <div className="Follow">
              <span>{user?.following.length}</span>
              <span>Following</span>
            </div>
            <div className="split-col"> </div>
            <div className="Follow">
              <span>{user?.followers.length}</span>
              <span>Followers</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="split-col"></div>
                <div className="Follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
      </div>
      {location !== "homePage" ? (
        <br />
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
