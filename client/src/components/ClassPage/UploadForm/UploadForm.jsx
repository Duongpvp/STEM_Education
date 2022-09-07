// @ts-nocheck
import { uploadMultiFile } from "actions/UploadAction";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const UploadForm = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const imagesRef = useRef(null);

  const onImagesChange = (e) => {
    if (e.target.files) {
      let img = e.target.files;
      setImages(img);
    }
  };

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
      <div>
        <input
          type="file"
          multiple
          name="file"
          required
          onChange={onImagesChange}
        />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  );
};

export default UploadForm;
