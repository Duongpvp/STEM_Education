// @ts-nocheck
import { Button, Popover, TextField } from "@mui/material";
import { getAllClass, joinClass } from "api/ClassRequest";
import Card from "components/Card/Card";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UserCard from "components/UserCard/UserCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "./ClassContainer.css";

const ClassContainer = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [classroom, setClassroom] = useState([]);
  const [code, setCode] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const fetchAllClass = async () => {
    try {
      const { data } = await getAllClass(user._id);
      setClassroom(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllClass();
  }, [fetchAgain]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!code) {
      toast.error("Code cannot be blank!");
    } else {
      try {
        const { data } = await joinClass(user._id, code);
        if (!data) {
          toast.error("Failed to join the class !");
        } else {
          for ( var i=0; i< data.users.length; i++) {
            console.log(data.users[i]._id)
            if ( data.users[i]._id === user._id ) {
              toast.warn("You have entered this class !");
            } else {
              toast.success("Joined class successfully !");
            }
          } 
        }
        setFetchAgain(!fetchAgain);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="class-container">
      <ToastContainer />
      <SideBarMotion />
      <div className="body-container">
        <div className="user-class-container">
          <UserCard />
        </div>
        <div className="class-list-container">
          <div className="class-list-title">Your class list</div>
          <button
            aria-describedby={id}
            onClick={handleClick}
            className="btn-join-class"
          >
            JOIN CLASS
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="join-container">
              <div className="join-title">Class Code</div>
              <span className="join-desc">
                Ask your teacher for the class code and then enter it here.
              </span>
              <TextField
                onChange={handleChange}
                id="filled-basic"
                label="Code"
                required
                variant="filled"
                fullWidth
              />
              <Button
                onClick={handleSubmit}
                className="join-submit"
                variant="contained"
              >
                SUBMIT
              </Button>
            </div>
          </Popover>
          <div className="class-list">
            {classroom.map((room) => (
              <Card
                key={room._id}
                nameClass={room.className}
                snippet={room.snippet}
                idClass={room._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassContainer;
