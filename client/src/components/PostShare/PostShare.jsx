// @ts-nocheck
import React, { useState, useRef } from "react";
import "./PostShare.css";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "actions/UploadAction";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const descRef = useRef();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const resetShare = () => {
    setImage(null);
    descRef.current.value = "";
  };

  const handleShare = (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (!newPost.desc || !newPost.image) {
      toast.warn("Please fill out all information.");
    } else {
      dispatch(uploadPost(newPost));
      resetShare();
    }
  };

  return (
    <div className="PostShare">
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/profile/${user._id}`}
      >
        <img
          src={
            user.outsideId
              ? user.profilePicture
              : user.profilePicture
              ? serverPublicFolder + user.profilePicture
              : serverPublicFolder + "DefaultAvatar.png"
          }
          alt="avatar"
        />
      </Link>

      <div>
        <input
          ref={descRef}
          required
          type="text"
          placeholder="What your're thinking..."
        />
        <div className="PostOptions">
          <div
            className="Option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <Icon icon="uil:scenery" className="op-icon" /> Photo
          </div>
          <div className="Option" disabled="disabled">
            <Icon icon="ant-design:play-circle-outlined" className="op-icon" />
            Video
          </div>
          <div className="Option" disabled="disabled">
            <Icon icon="akar-icons:location" className="op-icon" /> Location
          </div>
          <div className="Option" disabled="disabled">
            <Icon icon="ant-design:schedule-outlined" className="op-icon" />
            Schedule
          </div>
          <button
            className="btn Share-btn"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "UpLoading..." : "Share"}
          </button>
        </div>
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
            multiple
          />
        </div>
        {image && (
          <div className="PreviewImage">
            <Icon
              onClick={() => {
                setImage(null);
              }}
              icon="clarity:times-line"
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
