// @ts-nocheck
import ExerciseContainer from "components/ExerciseContainer/ExerciseContainer";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import UploadForm from "components/UploadForm/UploadForm";
import React from "react";
import "./Exercise.css";

const Exercise = () => {
  return (
    <div className="exercise">
      <SideBarMotion />
      <div className="body-exercise-container">
        <ExerciseContainer />
      </div>
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
