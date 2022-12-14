// @ts-nocheck
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  updateClassPost,
  uploadClassPost,
  uploadMultiFile,
} from "actions/UploadAction";
import UploadItems from "components/UploadForm/UploadItems";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./UploadPost.css";

const UploadPost = ({
  title,
  desc,
  setFetchAgain,
  fetchAgain,
  setOpened,
  location,
  postId,
  deadline,
}) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      toast.warn("Please complete all information!");
    } else {
      let timex = Date.now();
      const data = new FormData();
      data.append("time", timex);
      for (let i = 0; i < images.length; i++) {
        // data.append(`fileName`, Date.now() + images[i].name);
        data.append("files", images[i]);
        uploadedfile.push(timex + "__-__" + images[i].name);
      }
      dispatch(uploadMultiFile(data));
      try {
        const listFiles = JSON.stringify(uploadedfile.map((file) => file));
        if (location === "UpdatePost") {
          dispatch(updateClassPost(postId, title, desc, deadline, listFiles, params.id));
          toast.success("Post Updated successfully!");
        } else {
          dispatch(uploadClassPost(title, desc, deadline, listFiles, params.id));
          toast.success("Post created successfully!");
        }
        setFetchAgain(!fetchAgain);
        setOpened(false);
      } catch (error) {
        console.log(error);
      }
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
      <div className="btn-group">
        <button type="submit">Upload</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UploadPost;
