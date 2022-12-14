// @ts-nocheck
import "./CreateUserByAdmin.css";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mantine/core";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { signUpByAdmin } from "actions/AuthAction";

const CreateUserByAdmin = ({ fetchAgain, setFetchAgain }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    setOpened(true);
  };

  const createHandler = async () => {
    if (!data.firstname || !data.lastname || !data.username || !data.password) {
      toast.warn("Please fill out the content");
    } else {
      try {
        dispatch(signUpByAdmin(data, fetchAgain, setFetchAgain));
      } catch (error) {
        console.log(error);
      }
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
        title="Create new users"
      >
        <TextField
          label="Username"
          name="username"
          id="email-input"
          aria-describedby="my-helper-text"
          value={data.username}
          variant="outlined"
          fullWidth
          type="email"
          placeholder="Ex: user@gmail.com"
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        />
        <TextField
          label="Firstname"
          name="firstname"
          variant="outlined"
          value={data.firstname}
          fullWidth
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        />
        <TextField
          label="Lastname"
          name="lastname"
          value={data.lastname}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        />
        <TextField
          className="outlined-password-input"
          label="Password"
          name="password"
          value={data.password}
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          style={{ marginBottom: "12px" }}
        />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            defaultValue="Student"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="role"
            onChange={handleChange}
          >
            <FormControlLabel
              value="Admin"
              name="role"
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              value="Teacher"
              name="role"
              control={<Radio />}
              label="Teacher"
            />
            <FormControlLabel
              value="Student"
              control={<Radio />}
              name="role"
              label="Student"
            />
          </RadioGroup>
        </FormControl>
        <div className="btn-group-create">
          <Button variant="contained" onClick={createHandler}>
            Create
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              setData({
                firstname: "",
                lastname: "",
                username: "",
                password: "",
                role: "",
              })
            }
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className="create-user-by-admin" onClick={handleCreate}>
        <AddIcon /> New User
      </div>
    </>
  );
};

export default CreateUserByAdmin;
