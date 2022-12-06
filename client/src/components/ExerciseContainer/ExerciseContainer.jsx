// @ts-nocheck
import { Modal } from "@mantine/core";
import EditIcon from "@mui/icons-material/Edit";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { getAPost } from "api/ClassRequest";
import { fetchAllExercises } from "api/ExerciseRequest";
import UploadPost from "components/UploadPost/UploadPost";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  default as ReactTextareaAutosize,
  default as TextareaAutosize,
} from "react-textarea-autosize";
import "./ExerciseContainer.css";

const ExerciseContainer = () => {
  const params = useParams();
  const serverPublicFile = process.env.REACT_APP_FILES;
  const [post, setPost] = useState(null);
  const [deadLine, setDeadLine] = useState(null);
  const [title, setTitle] = useState(null);
  const [opened, setOpened] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [desc, setDesc] = useState(null);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [startDate, setStartDate] = useState(new Date());

  const getPost = async () => {
    try {
      const { data } = await getAPost(params.eid);
      setPost(data);
      setDesc(data.desc);
      setTitle(data.postTitle);
      setDeadLine(data.deadline);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [fetchAgain]);

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
  }, [fetchAgain]);

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
              value={title}
              required
              onChange={handleChangeTitle}
            />
            <label>Title</label>
          </div>
          <div className="input-box">
            <ReactTextareaAutosize
              minRows={1}
              name="message"
              value={desc}
              required
              className="submission"
              onChange={handleChangeDesc}
            />
            <label>Description</label>
          </div>
          <DatePicker
            className="date-picker"
            showTimeInput
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy - HH:mm"
            timeFormat="HH:mm"
          />
          {console.log(deadLine)}
          <UploadPost
            location={"UpdatePost"}
            postId={post && post._id}
            title={title}
            deadline={startDate}
            desc={desc}
            setFetchAgain={setFetchAgain}
            fetchAgain={fetchAgain}
            setOpened={setOpened}
          />
        </div>
      </Modal>
      <span className="exercise-title">
        {post?.postTitle}{" "}
        {(user && user.isAdmin) ||
          (user && user.isTeacher && (
            <EditIcon onClick={() => setOpened(true)} />
          ))}
      </span>
      <div
        className={
          Date.now() - new Date(deadLine) < 0
            ? "exercise-deadline"
            : "exercise-deadline-over"
        }
      >
        Deadline: <p>{moment(deadLine).format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>
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
            Here is a sample comment. This functionality is still in
            development.
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
