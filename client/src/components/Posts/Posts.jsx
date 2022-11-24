// @ts-nocheck
import React, { useState } from "react";
import "./Posts.css";
import Post from "../Post/Post.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeLinePosts } from "actions/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, [dispatch, user._id, fetchAgain]);

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Loading posts ..."
        : posts.map((post, id) => {
            return <Post key={id} data={post} id={id} setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />;
          })}
    </div>
  );
};

export default Posts;
