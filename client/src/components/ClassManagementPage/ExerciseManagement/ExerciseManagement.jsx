import AssignmentIcon from "@mui/icons-material/Assignment";
import GradingIcon from "@mui/icons-material/Grading";
import { getAPost } from "api/ClassRequest";
import ExerciseContainer from "components/ExerciseContainer/ExerciseContainer";
import Grading from "components/Grading/Grading";
import SideBarMotion from "components/SideBarMotion/SideBarMotion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./ExerciseManagement.css";

const ExerciseManagement = () => {
  const [post, setPost] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const params = useParams();

  const getPost = async () => {
    try {
      const { data } = await getAPost(params.eid);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="exercise-management">
      <ToastContainer/>
      <SideBarMotion />
      <div className="body-exercise-container" style={{ width: "100%" }}>
        {isPreview ? <ExerciseContainer /> : <Grading/>}
      </div>
      <div className="toggle-preview">
        <div
          className={isPreview ? "prev-toggle active" : "prev-toggle"}
          onClick={() => setIsPreview(true)}
        >
          <AssignmentIcon />
          <label>Preview</label>
        </div>
        <div
          className={!isPreview ? "grade-toggle active" : "grade-toggle"}
          onClick={() => setIsPreview(false)}
        >
          <GradingIcon />
          <label>Grade</label>
        </div>
      </div>
    </div>
  );
};

export default ExerciseManagement;
