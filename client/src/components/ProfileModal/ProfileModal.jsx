//@ts-nocheck
import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "actions/UploadAction";
import { updateUser } from "actions/UserAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

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
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
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
    dispatch(updateUser(param.id, userData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your infor</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="workAt"
            placeholder="Work At"
            onChange={handleChange}
            value={formData.workAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livein"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livein}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
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
        </div>

        <button className="btn Info-btn" onClick = {handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
