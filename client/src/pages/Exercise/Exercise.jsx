// @ts-nocheck
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
import { getAPost } from "api/ClassRequest";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UploadForm from "components/UploadForm/UploadForm";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./Exercise.css";

const Exercise = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const [files, setFiles] = useState([{ name: "mp3.sd" }, { name: "mp4.sd" }]);
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const getPost = async () => {
    try {
      const { data } = await getAPost(params.eid);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="exercise">
      <SideBarMotion />
      <div className="body-exercise-container">
        <span className="exercise-title">{post?.postTitle}</span>
        <span className="timestamp">
          Updated: {post?.updatedAt.slice(0, 10)}-
          {post?.updatedAt.slice(11, 19)}
        </span>
        <span className="grade">Current grade: 0/100</span>
        <div className="hr-line">
          <hr className="lines" />
        </div>

        <p className="exercise-desc">{post?.desc}</p>

        <div className="hr-line">
          <hr className="nav-lines" />
        </div>
        <div className="ex-comment">
          <PeopleIcon />
          Exercise comment
        </div>
        <div className="user-exercise">
          <img
            src={
              user.profilePicture
                ? serverPublicFolder + user.profilePicture
                : serverPublicFolder + "DefaultAvatar.png"
            }
            alt=""
          />
          <div className="user-comment">
            <span>{user.lastname}</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reiciendis neque commodi nostrum tenetur temporibus distinctio
              eaque a rem! Nobis eveniet velit mollitia enim. Obcaecati, quidem
              iusto! Eveniet dignissimos beatae officia.
            </p>
          </div>
        </div>
        <div className="hr-line">
          <hr className="nav-lines" />
        </div>
        <div className="user-input">
          <img
            src={
              user.profilePicture
                ? serverPublicFolder + user.profilePicture
                : serverPublicFolder + "DefaultAvatar.png"
            }
            alt=""
          />
          <form>
            <div className="input-box">
              <TextareaAutosize minRows={2} name="message" required />
              <label>Message</label>
              <SendIcon className="send-icon" />
            </div>
          </form>
        </div>
      </div>
      <div className="review-exercise">
        <div className="preview-card">
          <span className="preview-title">Your current exercises</span>
          <UploadForm/>
          <button>Cancel submit</button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
