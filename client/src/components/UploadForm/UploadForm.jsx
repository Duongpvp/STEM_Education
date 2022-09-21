// @ts-nocheck
import { uploadExercise, uploadMultiFile } from "actions/UploadAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./UploadForm.css";
import UploadItems from "./UploadItems";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import SendIcon from "@mui/icons-material/Send";

const UploadForm = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [submission, setSubmission] = useState();
  const params = useParams();

  const uploadedfile = [];

  const onImagesChange = (e) => {
    if (e.target.files) {
      let img = e.target.files;
      setImages(img);
    }
  };

  const handleCancel = () => {
    setImages([]);
  };

  const handleChange = (e) => {
    setSubmission(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let timex = Date.now()
    const data = new FormData();
    data.append("time", timex)
    for (let i = 0; i < images.length; i++) {
      // data.append("name", (Date.now() + images[i].name));
      data.append("files", images[i]);
      uploadedfile.push(timex+ "__-__" + images[i].name); // render
    }
    dispatch(uploadMultiFile(data));
    //render data
    try {
      const listFiles = JSON.stringify(uploadedfile.map((file) => file));
      dispatch(uploadExercise(user._id, submission, listFiles, params.eid));
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
        />
        <button>
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
          className="submission"
          onChange={handleChange}
        />
        <label>Message</label>
        <SendIcon className="send-icon" />
      </div>
      <div className="btn-group">
        <button type="submit">Upload</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UploadForm;
