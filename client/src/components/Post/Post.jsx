// @ts-nocheck
import React from "react";
import { Icon } from "@iconify/react";
import "./Post.css";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "api/PostRequest";


const Post = ({ data, id }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_FOLDER + data.image : ""}
        alt=""
      />
      <div className="PostReact">
        {liked ? (
          <Icon icon="emojione-v1:red-heart" style={{cursor: "pointer"}} onClick = {handleLike} />
        ) : (
          <Icon icon="akar-icons:heart" style={{cursor: "pointer]"}} onClick = {handleLike} />
        )}
        <Icon icon="akar-icons:comment" style={{cursor: "not-allowed"}}/>
        <Icon icon="bxs:share" style={{cursor: "not-allowed"}}/>
      </div>
      <span style={{ color: "var(--gray)", fontSize: "0.8rem" }}>
        {likes} Likes
      </span>
      <div className="DetailPost">
        <span>
          <b>{data.auth} - </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
