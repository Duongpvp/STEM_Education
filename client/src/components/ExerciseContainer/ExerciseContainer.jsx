// @ts-nocheck
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { getAPost } from "api/ClassRequest";
import { fetchAllExercises } from "api/ExerciseRequest";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./ExerciseContainer.css";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mantine/core";
import ReactTextareaAutosize from "react-textarea-autosize";
import UploadPost from "components/UploadPost/UploadPost";

const ExerciseContainer = () => {
  const params = useParams();
  const serverPublicFile = process.env.REACT_APP_FILES;
  const [post, setPost] = useState(null);
  const [opened, setOpened] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [title, setTitle] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [desc, setDesc] = useState(null);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const getPost = async () => {
    try {
      const { data } = await getAPost(params.eid);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const getExercise = async () => {
    try {
      const { data } = await fetchAllExercises(params.eid);
      setExercise(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercise();
  }, []);

  const exerciseUser = exercise?.find((e) => e.sender._id === user._id);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Class Post"
        size="50%"
      >
        <div className="class-modal-content">
          <div className="input-box">
            <ReactTextareaAutosize
              minRows={1}
              name="title"
              required
              onChange={handleChangeTitle}
            />
            <label>Title</label>
          </div>
          <div className="input-box">
            <ReactTextareaAutosize
              minRows={1}
              name="message"
              required
              className="submission"
              onChange={handleChangeDesc}
            />
            <label>Description</label>
          </div>
          <UploadPost
            title={title}
            desc={desc}
            setFetchAgain={setFetchAgain}
            fetchAgain={fetchAgain}
            setOpened={setOpened}
          />
        </div>
      </Modal>
      <span className="exercise-title">
        {post?.postTitle} <EditIcon onClick={() => setOpened(true)} />
      </span>
      <span className="timestamp">
        Updated: {post?.updatedAt.slice(0, 10)}-{post?.updatedAt.slice(11, 19)}
      </span>
      {(user && user.isAdmin) || (user && user.isTeacher)
        ? ""
        : user && (
            <span className="grade">
              Current grade:{" "}
              {exerciseUser?.grade ? exerciseUser?.grade : "none"}/10
            </span>
          )}
      <div className="hr-line">
        <hr className="lines" />
      </div>

      <div style={{ whiteSpace: "pre-line" }}>
        <p className="exercise-desc">{post?.desc}</p>
      </div>
      <div className="exercise-files">
        {post?.files.map((file, i) => (
          <div key={i} className="exercise-file-item">
            <a target="_blank" href={`${serverPublicFile + file}`}>
              <Button color="secondary" variant="contained">
                <FileOpenIcon /> {file.slice(18)}
              </Button>
            </a>
          </div>
        ))}
      </div>
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
            user.outsideId
              ? user.profilePicture
              : user.profilePicture
              ? serverPublicFolder + user.profilePicture
              : serverPublicFolder + "DefaultAvatar.png"
          }
          alt=""
        />
        <div className="user-comment">
          <span>{user.lastname}</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            neque commodi nostrum tenetur temporibus distinctio eaque a rem!
            Nobis eveniet velit mollitia enim. Obcaecati, quidem iusto! Eveniet
            dignissimos beatae officia.
          </p>
        </div>
      </div>
      <div className="hr-line">
        <hr className="nav-lines" />
      </div>
      <div className="user-input">
        <img
          src={
            user.outsideId
              ? user.profilePicture
              : user.profilePicture
              ? serverPublicFolder + user.profilePicture
              : serverPublicFolder + "DefaultAvatar.png"
          }
          alt=""
        />
        <form style={{ width: "100%" }}>
          <div className="input-box">
            <TextareaAutosize minRows={2} name="message" required />
            <label>Message</label>
            <SendIcon className="send-icon" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ExerciseContainer;
