import express from "express";
import { allExercise, cancelExercise, createExercise, gradeExercise } from "../controllers/ExerciseController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/createExercise").post(createExercise);
router.route("/grade").put(gradeExercise);
router.route("/cancel").delete(cancelExercise);
router.route("/:postId").get(allExercise);

export default router;
