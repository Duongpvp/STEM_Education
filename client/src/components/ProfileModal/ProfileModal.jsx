//@ts-nocheck
import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "actions/UploadAction";
import { updateUser } from "actions/UserAction";
import ImageIcon from "@mui/icons-material/Image";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { toast, ToastContainer } from "react-toastify";

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

    
    if (!formData.firstname  || !formData.lastname ) {
      toast.warn("First name and last name cannot be empty!")
    } else {
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
    dispatch(updateUser(param.id, userData));
    setModalOpened(false);
    }
  };

  return (
    <Modal
      size="auto"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <ToastContainer/>
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
        <button className="btn Info-btn" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
    // <Modal
    //   overlayColor={
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[9]
    //       : theme.colors.gray[2]
    //   }
    //   overlayOpacity={0.55}
    //   overlayBlur={3}
    //   size="50%"
    //   opened={modalOpened}
    //   onClose={() => setModalOpened(false)}
    // >
    //   <form className="infoForm">
    //     <h4>YOUR INFORMATION</h4>
    //     <div>
    //       <input
    //         type="text"
    //         className="infoInput"
    //         name="firstname"
    //         placeholder="First Name"
    //         onChange={handleChange}
    //         value={formData.firstname}
    //       />
    //       <input
    //         type="text"
    //         className="infoInput"
    //         name="lastname"
    //         placeholder="Last Name"
    //         onChange={handleChange}
    //         value={formData.lastname}
    //       />
    //     </div>
    //     <div>
    //       <input
    //         type="text"
    //         className="infoInput"
    //         name="workAt"
    //         placeholder="Status"
    //         onChange={handleChange}
    //         value={formData.workAt}
    //       />
    //     </div>
    //     <div>
    //       <input
    //         type="text"
    //         className="infoInput"
    //         name="livein"
    //         placeholder="Lives in"
    //         onChange={handleChange}
    //         value={formData.livein}
    //       />

    //       <input
    //         type="text"
    //         className="infoInput"
    //         name="country"
    //         placeholder="Country"
    //         onChange={handleChange}
    //         value={formData.country}
    //       />
    //     </div>

    //     <div>
    //       <input
    //         type="text"
    //         className="infoInput"
    //         placeholder="RelationShip Status"
    //         name="relationship"
    //         onChange={handleChange}
    //         value={formData.relationship}
    //       />
    //     </div>

    //     <div
    //       style={{
    //         position: "relative",
    //         display: "flex",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <div
    //         style={{
    //           borderRadius: "50px",
    //           background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
    //           boxShadow: "-7px 7px 14px #cecece, 7px -7px 14px #f2f2f2",
    //           width: "50%",
    //           textAlign: "center",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           padding: "8px 4px",
    //         }}
    //       >
    //         <span
    //           style={{
    //             fontSize: "0.8rem",
    //             width: "100%",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <ImageIcon style={{ zIndex: "1" }} />
    //           Profile Image
    //         </span>
    //         <input
    //           type="file"
    //           name="profileImage"
    //           id="chooseFile"
    //           onChange={onImageChange}
    //           style={{
    //             opacity: "0",
    //             position: "absolute",
    //             zIndex: "2",
    //             cursor: "pointer",
    //           }}
    //         />
    //       </div>
    //       <div
    //         style={{
    //           borderRadius: "50px",
    //           background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
    //           boxShadow: "-7px 7px 14px #cecece, 7px -7px 14px #f2f2f2",
    //           width: "50%",
    //           textAlign: "center",
    //           display: "flex",
    //           alignItems: "center",
    //         }}
    //       >
    //         <span
    //           style={{
    //             fontSize: "0.8rem",
    //             width: "100%",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <AccountBoxIcon />
    //           Cover Image
    //         </span>
    //         <input
    //           type="file"
    //           name="coverImage"
    //           id="chooseFile"
    //           onChange={onImageChange}
    //           style={{
    //             opacity: "0",
    //             position: "absolute",
    //             zIndex: "2",
    //             cursor: "pointer",
    //           }}
    //         />
    //       </div>
    //     </div>

    //     <button className="btn Info-btn" onClick={handleSubmit}>
    //       Update
    //     </button>
    //   </form>
    // </Modal>
  );
}

export default ProfileModal;
