import * as ExerciseApi from "../api/ExerciseRequest";

export const gradingExercise = (exerciseId, grade) => async () => {
  try {
    console.log(exerciseId)
    console.log(grade)
    const { data } = await ExerciseApi.gradingExercise(exerciseId, grade);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
