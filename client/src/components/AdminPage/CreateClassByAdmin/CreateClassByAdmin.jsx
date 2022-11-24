// @ts-nocheck
import { Modal } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { createClass } from "actions/ClassAction";
import { uploadImage } from "actions/UploadAction";
import { searchUser } from "api/UserRequest";
import UserListItems from "components/UserListItems/UserListItems";
import UserTagItem from "components/UserTagItem/UserTagItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast, ToastContainer } from "react-toastify";
import "./CreateClassByAdmin.css";

const CreateClassByAdmin = ({ fetchAgain, setFetchAgain }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTeacher, setIsLoadingTeacher] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultTeacher, setSearchResultTeacher] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersTeacher, setSelectedUsersTeacher] = useState([]);
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    className: "",
    snippet: "",
    classAdmin: [],
    users: [],
    image: "",
  });

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setData({
        ...data,
        image: img.name,
      });
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data);
  const handleCreate = () => {
    setOpened(true);
  };

  const createHandler = async () => {
    try {
      const formData = new FormData();
      const fileName = Date.now() + image.name;
      formData.append("name", fileName);
      formData.append("file", image);
      data.image = fileName;
      try {
        dispatch(uploadImage(formData));
      } catch (err) {
        console.log(err);
      }
      const listUsers = JSON.stringify(selectedUsers.map((u) => u._id));
      const listUsersTeacher = JSON.stringify(
        selectedUsersTeacher.map((u) => u._id)
      );
      data.users = listUsers;
      data.classAdmin = listUsersTeacher;

      dispatch(
        createClass(
          data.className,
          data.classAdmin,
          data.users,
          data.snippet,
          data.image,
          setFetchAgain,
          fetchAgain
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await searchUser(search);
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {}
  };

  const handleSearchTeacher = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResultTeacher([]);
      return;
    }
    try {
      setIsLoadingTeacher(true);
      const { data } = await searchUser(search);
      setIsLoadingTeacher(false);
      setSearchResultTeacher(data.filter((user) => user.isTeacher && user));
    } catch (error) {}
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((select) => select._id !== user._id));
  };
  const handleDeleteTeacher = (user) => {
    setSelectedUsersTeacher(
      selectedUsersTeacher.filter((select) => select._id !== user._id)
    );
  };

  const handleGroup = (user) => {
    let selectedUserId = [];
    for (var i = 0; i < selectedUsers.length; i++) {
      selectedUserId.push(selectedUsers[i]._id);
    }

    if (selectedUserId.includes(user._id)) {
      toast.error("User already added");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleGroupTeacher = (user) => {
    let selectedTeacherId = [];
    for (var i = 0; i < selectedUsersTeacher.length; i++) {
      selectedTeacherId.push(selectedUsersTeacher[i]._id);
    }
    if (selectedTeacherId.includes(user._id)) {
      toast.error("User already added");
    } else {
      setSelectedUsersTeacher([...selectedUsersTeacher, user]);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        transition="fade"
        transitionDuration={600}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create new class"
      >
        <TextField
          id="outlined-basic"
          label="Class Name"
          name="className"
          type="email"
          value={data.className}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        />
        <div className="input-box">
          <ReactTextareaAutosize
            minRows={2}
            name="snippet"
            required
            value={data.snippet}
            onChange={handleChange}
          />
          <label>Description</label>
        </div>
        {/* <TextField
          id="outlined-basic"
          label="Description Class"
          name="snippet"
          variant="outlined"
          value={data.snippet}
          fullWidth
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        /> */}
        <FormControl fullWidth>
          <TextField
            placeholder="Ex: YanG, Denis, Flex, Aliz ( Teacher users ) "
            fullWidth
            id="filled-basic"
            label="Teachers"
            variant="outlined"
            onChange={(e) => handleSearchTeacher(e.target.value)}
            style={{ marginBottom: "12px" }}
          />
        </FormControl>
        <Box width="100%" display="flex" flexWrap="wrap">
          {selectedUsersTeacher.map((tag) => (
            <UserTagItem
              key={tag._id}
              user={tag}
              handleFunction={() => handleDeleteTeacher(tag)}
            />
          ))}
        </Box>
        {isLoadingTeacher
          ? "Loading..."
          : searchResultTeacher &&
            searchResultTeacher
              ?.slice(0, 10)
              ?.map((user) => (
                <UserListItems
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroupTeacher(user)}
                />
              ))}
        <FormControl fullWidth>
          <TextField
            placeholder="Ex: YanG, Denis, Flex, Aliz"
            fullWidth
            id="filled-basic"
            label="Users"
            variant="outlined"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: "12px" }}
          />
        </FormControl>
        <Box width="100%" display="flex" flexWrap="wrap">
          {selectedUsers.map((tag) => (
            <UserTagItem
              key={tag._id}
              user={tag}
              handleFunction={() => handleDelete(tag)}
            />
          ))}
        </Box>
        {isLoading
          ? "Loading..."
          : searchResult &&
            searchResult
              ?.slice(0, 7)
              ?.map((user) => (
                <UserListItems
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))}
        <form className="student-upload-file">
          <div className="upload-form">
            <input type="file" name="file" required onChange={onImageChange} />
            <span className="support-file">Support files</span>
            <p className="desc-support">PNG, JPG</p>
            <button>
              <AddCircleOutlineIcon />
              {image && image.name ? image.name : "Upload"}
            </button>
          </div>
        </form>
        <div className="btn-group-create">
          <Button variant="contained" onClick={createHandler}>
            Create
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              setData({
                className: "",
                snippet: "",
                classAdmin: "",
                users: [],
                image: "",
              })
            }
          >
            Clear
          </Button>
        </div>
      </Modal>
      <div className="create-user-by-admin" onClick={handleCreate}>
        <AddIcon /> New Class
      </div>
    </>
  );
};

export default CreateClassByAdmin;
