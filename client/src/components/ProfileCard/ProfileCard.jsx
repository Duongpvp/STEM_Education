// @ts-nocheck
import React, { useState } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mantine/core";
import { uploadImage } from "actions/UploadAction";
import { updateUser } from "actions/UserAction";
import ImageIcon from "@mui/icons-material/Image";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const ProfileCard = ({ user, location }) => {
  const { userMain } = useSelector((state) => state.AuthReducer.authData.user);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState(user);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(user._id, userData));
    setOpened(false);
  };

  return (
    <div className="ProfileCard">
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <form className="infoForm">
          <h4>YOUR INFORMATION</h4>
          <div>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formData?.firstname}
            />
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData?.lastname}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="workAt"
              placeholder="Work At"
              onChange={handleChange}
              value={formData?.workAt}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="livein"
              placeholder="Lives in"
              onChange={handleChange}
              value={formData?.livein}
            />

            <input
              type="text"
              className="infoInput"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData?.country}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="RelationShip Status"
              name="relationship"
              onChange={handleChange}
              value={formData?.relationship}
            />
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: "50px",
                background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                boxShadow: "-7px 7px 14px #cecece, 7px -7px 14px #f2f2f2",
                width: "50%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 4px",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageIcon style={{ zIndex: "1" }} />
                {profileImage?.name ? profileImage.name : "Avatar"}
              </span>
              <input
                type="file"
                name="profileImage"
                id="chooseFile"
                onChange={onImageChange}
                style={{
                  opacity: "0",
                  position: "absolute",
                  zIndex: "2",
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              style={{
                borderRadius: "50px",
                background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                boxShadow: "-7px 7px 14px #cecece, 7px -7px 14px #f2f2f2",
                width: "50%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AccountBoxIcon />
                {coverImage?.name ? coverImage.name : "Cover Image"}
              </span>
              <input
                type="file"
                name="coverImage"
                id="chooseFile"
                onChange={onImageChange}
                style={{
                  opacity: "0",
                  position: "absolute",
                  zIndex: "2",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* <div>
            <span>Profile Image</span>
            <input
              type="file"
              name="profileImage"
              id="chooseFile"
              onChange={onImageChange}
            />
            <span>Cover Image</span>
            <input
              type="file"
              name="coverImage"
              id="chooseFile"
              onChange={onImageChange}
            />
          </div> */}

          <button className="btn Info-btn" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </Modal>
      <div className="ProfileImages">
        <img
          src={
            user?.coverPicture
              ? serverPublicFolder + user.coverPicture
              : serverPublicFolder + "DefaultBackground.png"
          }
          alt="Cover - Background Wallpaper"
        />
        {location === "profilePage" ? (
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={
                user?.outsideId
                  ? serverPublicFolder + user.profilePicture
                  : user?.profilePicture
                  ? serverPublicFolder + user.profilePicture
                  : serverPublicFolder + "DefaultAvatar.png"
              }
              alt="Avatar"
            />
            <EditIcon
              onClick={() => {
                setOpened(true);
              }}
            />
          </div>
        ) : (
          <img
            src={
              user?.outsideId
                ? user.profilePicture
                : user?.profilePicture
                ? serverPublicFolder + user.profilePicture
                : serverPublicFolder + "DefaultAvatar.png"
            }
            alt="Avatar"
          />
        )}
        <div className="ProfileName">
          <span>
            {user?.firstname} {user?.lastname}
          </span>
          <span>{user?.workAt ? user?.workAt : "No caption"}</span>
        </div>

        <div className="FollowStatus">
          <hr />
          <div>
            <div className="Follow">
              <span>{user?.following.length}</span>
              <span>Following</span>
            </div>
            <div className="split-col"> </div>
            <div className="Follow">
              <span>{user?.followers.length}</span>
              <span>Followers</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="split-col"></div>
                <div className="Follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
      </div>
      {location !== "homePage" ? (
        <br />
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
