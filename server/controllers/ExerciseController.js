import classModel from "../models/classModel.js";
import exerciseModel from "../models/exerciseModel.js";
import UserModel from "../models/userModel.js";

export const createExercise = async (req, res) => {
  const { userId, submission, postId } = req.body;
  const listFile = JSON.parse(req.body.file);
  if (!req.body) {
    return res.status(400).json("Invalid data passed into request");
  }
  var newExercise = {
    sender: userId,
    submission: submission,
    files: listFile,
    postId: postId,
    grade: null,
  };

  try {
    var exercise = await exerciseModel.create(newExercise);

    exercise = await exercise.populate(
      "sender",
      "firstname lastname username followers following profilePicture"
    );
    exercise = await exercise.populate("postId");
    exercise = await exercise.populate("files");
    exercise = await UserModel.populate(exercise, {
      path: "postId.users",
      select: "firstname lastname followers following username profilePicture",
    });

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const gradeExercise = async (req, res) => {
  const { grade, exerciseId } = req.body;

  if (!req.body) {
    return res.status(400).json("Invalid data passed into request");
  }

  try {
    var exercise = await exerciseModel
      .findByIdAndUpdate(exerciseId, { grade }, { new: true })
      .populate(
        "sender",
        "firstname lastname followers following profilePicture"
      )
      .populate("submission")
      .populate("files")
      .populate("postId");

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const cancelExercise = async (req, res) => {
  const { exerciseId, userId } = req.body;

  try {
    const exercise = await exerciseModel.findById(exerciseId);
    if (exercise.sender.toString() === userId) {
      await exercise.deleteOne();
      res.status(200).json("Exercise deleted!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allExercise = async (req, res) => {
  try {
    const exercise = await exerciseModel
      .find({
        postId: req.params.postId,
      })
      .populate(
        "sender",
        "firstname lastname followers following username profilePicture"
      )
      .populate("submission")
      .populate("files")
      .populate("grade");

    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json(error);
  }
};
