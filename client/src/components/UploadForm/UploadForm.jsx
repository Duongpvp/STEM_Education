// @ts-nocheck
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { uploadExercise, uploadMultiFile } from "actions/UploadAction";
import { getAPost } from "api/ClassRequest";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import "./UploadForm.css";
import UploadItems from "./UploadItems";

const UploadForm = ({ setFetchAgain, fetchAgain }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [submission, setSubmission] = useState();
  const params = useParams();
  const uploadedfile = [];
  const [post, setPost] = useState(null);
  const [deadLine, setDeadLine] = useState(null);

  const getPost = async () => {
    try {
      const { data } = await getAPost(params.eid);
      setPost(data);
      setDeadLine(data.deadline);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [fetchAgain]);

  const onImagesChange = (e) => {
    if (e.target.files) {
      let img = e.target.files;
      setImages(img);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setImages([]);
  };

  const handleChange = (e) => {
    setSubmission(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let timex = Date.now();
    const data = new FormData();
    data.append("time", timex);
    for (let i = 0; i < images.length; i++) {
      // data.append("name", (Date.now() + images[i].name));
      data.append("files", images[i]);
      uploadedfile.push(timex + "__-__" + images[i].name); // render
    }
    dispatch(uploadMultiFile(data));
    //render data
    try {
      const listFiles = JSON.stringify(uploadedfile.map((file) => file));
      dispatch(uploadExercise(user._id, submission, listFiles, params.eid));
      toast.success(" Upload exercises successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFetchAgain(!fetchAgain);
      setImages([]);
      setSubmission(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-upload-file">
      <div className="upload-form">
        <input
          type="file"
          multiple
          name="file"
          required
          onChange={onImagesChange}
          disabled={Date.now() - new Date(deadLine) > 0 ? true : false}
        />
        <button >
          <AddCircleOutlineIcon />
          Upload
        </button>
        <span className="support-file">Support files</span>
        <p className="desc-support">PNG, JPG, PDF</p>
      </div>
      <UploadItems files={images} setFiles={setImages} />
      <div className="input-box">
        <ReactTextareaAutosize
          minRows={1}
          name="message"
          required
          value={submission}
          className="submission"
          onChange={handleChange}
        />
        <label>Message</label>
      </div>
      {Date.now() - new Date(deadLine) < 0 ? (
        <div className="btn-group">
          <button type="submit">Upload</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <p
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "1.2rem",
            color: "red",
            fontWeight: "700",
          }}
        >
          Submission deadline has expired!
        </p>
      )}
    </form>
  );
};

export default UploadForm;
