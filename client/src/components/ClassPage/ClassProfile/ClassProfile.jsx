import { getAllPost } from "api/ClassRequest";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassHeader from "../ClassHeader/ClassHeader";
import "./ClassProfile.css";

const ClassProfile = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  const fetchExercise = async () => {
    try {
      const { data } = await getAllPost(params.id);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <div className="sidebar-container">
      <SideBarMotion />
      <div className="sidebar-body">
        <ClassHeader />
        <div className="news">
          <img
            src="https://i.pinimg.com/originals/74/2d/6e/742d6ef765435708f9799c25eb7cbb36.jpg"
            alt="thumbnail"
          />
          <div className="glass-card-grid">
            {posts.map((post) => (
              <article className="glass-card" key={post._id}>
                <div className="glass-card-title">
                  <a>{post.postTitle}</a>
                </div>

                <p>{post.desc}</p>
                <div className="author-row">
                  <a className="author-name">{post.files}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClassProfile);
