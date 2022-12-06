// @ts-nocheck
import { Modal } from "@mantine/core";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Button } from "@mui/material";
import { getExercise } from "api/ExerciseRequest";
import ExerciseContainer from "components/ExerciseContainer/ExerciseContainer";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UploadForm from "components/UploadForm/UploadForm";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Exercise.css";

const Exercise = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [exerciseData, setExerciseData] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const { data } = await getExercise(params.eid, user._id);
        setExerciseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExercise();
  }, [fetchAgain]);

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
          <span className="preview-title">YOUR CURRENT EXERCISES</span>
          <span
            className="isSubmit"
            style={{
              color:
                exerciseData && exerciseData.length > 0 ? "#017a22" : "#ff1f40",
            }}
          >
            {exerciseData && exerciseData.length > 0
              ? "Submitted"
              : "Unsubmitted"}
          </span>
          <UploadForm setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
          <span className="submited-title">SUBMITED FILES</span>
          <div className="file-submited">
            {exerciseData[0]?.files.map((e, i) => (
              <a target="_blank" href={process.env.REACT_APP_FILES + e}>
                <Button color="secondary" key={i} variant="contained">
                  <p>{e}</p>
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
