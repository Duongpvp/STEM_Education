import express from "express";
import { allExercise, cancelExercise, createExercise, getExercise, gradeExercise } from "../controllers/ExerciseController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/createExercise").post(createExercise);
router.route("/getExercise/:exc/:id").get(getExercise)
router.route("/grade").put(gradeExercise);
router.route("/cancel").delete(cancelExercise);
router.route("/:postId").get(allExercise);

export default router;
