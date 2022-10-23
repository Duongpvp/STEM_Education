// @ts-nocheck
import { Modal } from "@mantine/core";
import ExerciseContainer from "components/ExerciseContainer/ExerciseContainer";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UploadForm from "components/UploadForm/UploadForm";
import React, { useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { ToastContainer } from "react-toastify";
import "./Exercise.css";
import { Button } from "@mui/material";

const Exercise = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="exercise">
      <SideBarMotion />
      <div className="body-exercise-management-container">
        <Button
          size="large"
          variant="contained"
          onClick={() => setOpened(true)}
        >
          <WidgetsIcon />
        </Button>
        <ExerciseContainer />
      </div>
      <ToastContainer />
      <Modal
        title="Your current exercises"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <UploadForm />
      </Modal>
      <div className="review-exercise">
        <div className="preview-card">
          <span className="preview-title">Your current exercises</span>
          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default Exercise;
