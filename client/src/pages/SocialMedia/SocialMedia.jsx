import NavigationMenu from "components/NavigationMenu/NavigationMenu";
import React from "react";
import NoticeSide from "../../components/NoticeSide/NoticeSide";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import "./SocialMedia.css";

const SocialMedia = () => {
  return (
    <div className="SocialMedia">
      <div className="nav-bottom-right-menu">
        <NavigationMenu />
      </div>
      <ProfileSide />
      <PostSide />
      <NoticeSide />
    </div>
  );
};

export default SocialMedia;
