// @ts-nocheck
import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import React from "react";
import { useSelector } from "react-redux";
import NoticeSide from "../../components/NoticeSide/NoticeSide.jsx";
import PostSide from "../../components/PostSide/PostSide.jsx";
import ProfileCard from "../../components/ProfileCard/ProfileCard.jsx";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft.jsx";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  return (
    <div className="Profile">
      <div className="nav-bottom-right-menu">
        <NavigationMenu />
      </div>
      <ProfileLeft />
      <div className="ProfileCenter">
        <ProfileCard user={user} location={"profilePage"} />
        <PostSide />
      </div>
      <NoticeSide />
    </div>
  );
};

export default Profile;
