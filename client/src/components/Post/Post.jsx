// @ts-nocheck
import React from "react";
import { Icon } from "@iconify/react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "api/PostRequest";
import { updatePost } from "actions/PostAction";
import ReactTextareaAutosize from "react-textarea-autosize";

const Post = ({ data, id, setFetchAgain, fetchAgain }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [editData, setEditData] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setEditData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    dispatch(updatePost(editData._id, editData, setIsEdit, setFetchAgain, fetchAgain))
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_FOLDER + data.image : ""}
        alt=""
      />
      <div className="PostReact">
        {liked ? (
          <Icon
            icon="emojione-v1:red-heart"
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
        ) : (
          <Icon
            icon="akar-icons:heart"
            style={{ cursor: "pointer]" }}
            onClick={handleLike}
          />
        )}
        <Icon icon="akar-icons:comment" style={{ cursor: "not-allowed" }} />
        <Icon
          icon="bxs:share"
          style={{ cursor: "pointer" }}
          onClick={() => setIsEdit(true)}
        />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "0.8rem" }}>
        {likes} Likes
      </span>
      <div className="DetailPost">
        <span>
          <b>{data.auth} - </b>
        </span>
        {isEdit ? (
          <>
            <ReactTextareaAutosize
              minRows={1}
              name="desc"
              required
              value={editData.desc}
              className="submission"
              onChange={handleChange}
            ></ReactTextareaAutosize>
            <button onClick={handleEdit}>Save</button>
          </>
        ) : (
          <span>{data.desc}</span>
        )}
      </div>
    </div>
  );
};

export default Post;
