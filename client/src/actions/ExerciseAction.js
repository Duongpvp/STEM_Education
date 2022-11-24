import { toast } from "react-toastify";
import * as ExerciseApi from "../api/ExerciseRequest";

export const gradingExercise = (exerciseId, grade, setFetchAgain, fetchAgain) => async () => {
  try {
    const { data } = await ExerciseApi.gradingExercise(exerciseId, grade);
    if (data) {
      toast.success("Successful scoring!");
      setFetchAgain(!fetchAgain);
    }
  } catch (error) {
    console.log(error);
  }
};
