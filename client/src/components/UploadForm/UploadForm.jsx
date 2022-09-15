// @ts-nocheck
import { uploadMultiFile } from "actions/UploadAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./UploadForm.css";
import UploadItems from "./UploadItems";

const UploadForm = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const onImagesChange = (e) => {
    if (e.target.files) {
      let img = e.target.files;
      setImages(img);
    }
  };

  const handleCancel = () => {
    setImages([])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      // data.append(`fileName`, Date.now() + images[i].name);
      data.append("file", images[i]);
    }
    dispatch(uploadMultiFile(data));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <UploadItems files={images} setFiles={setImages}/>
      <div className="btn-group">
        <button type="submit">Upload</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UploadForm;
