import { getAllPost } from "api/ClassRequest";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
              <Link to={`./exercise/${post._id}`} key={post._id}>
                <article className="glass-card">
                  <div className="glass-card-title">{post.postTitle}</div>
                  <p>{post.desc}</p>
                  <div className="author-row">{post.files}</div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ClassProfile);
