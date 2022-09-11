import classModel from "../models/classModel.js";
import UserModel from "../models/userModel.js";
import exerciseModel from "../models/exerciseModel.js";
import mongoose from "mongoose";

export const createClass = async (req, res) => {
  if (!req.body.users || !req.body.className || !req.body.classAdmin) {
    return res.status(400).send({ mess: "Please fill al the fields" });
  }

  var users = JSON.parse(req.body.users);

  try {
    const classRoom = await classModel.create({
      className: req.body.className,
      snippet: req.body.snippet,
      users: users,
      image: "",
      classAdmin: req.body.classAdmin,
    });

    const fullClassRoom = await classModel
      .findOne({ _id: classRoom._id })
      .populate("users", "-password")
      .populate("classAdmin", "-password");

    res.status(200).send(fullClassRoom);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getClass = async (req, res) => {
  const userId = req.params.userId;

  try {
    const currentUser = await UserModel.findById(userId);
    const userClass = await classModel
      .find({ users: currentUser })
      .populate("users", "-password");
    // console.log(userClass);
    // const exerciseUser = await exerciseModel.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "exercises",
    //       localField: "sender",
    //       foreignField: "userId",
    //       as: "exerciseUser",
    //     },
    //   },
    //   {
    //     $project: {
    //       exerciseUser: 1,
    //       _id: 0,
    //     },
    //   },
    // ]);
    // console.log(
    //   currentUser.concat(...exerciseUser[0].exerciseUser).sort((a, b) => {
    //     return b.createdAt - a.createdAt;
    //   })
    // );
    res.status(200).json(userClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllClass = async (req, res) => {
  try {
    const classed = await classModel.find().populate("users", "-password");
    res.status(200).json(classed);
  } catch (error) {
    console.log(error);
  }
};

export const updateClass = async (req, res) => {
  const id = req.params.id;
  const img = req.body.image;
  const updatedClass = await classModel
    .findByIdAndUpdate(id, { image: img }, { new: true })
    .populate("users", "-password")
    .populate("classAdmin", "-password");

  if (!updatedClass) {
    res.status(404).json("Class not found !");
  } else {
    res.send(updatedClass);
  }
};

export const deleteClass = async (req, res) => {
  const id = req.params.id;
  const user = req.body.classAdmin;

  try {
    const classRoom = await classModel.findById(id);

    console.log(classRoom.classAdmin.toString());

    if (classRoom.classAdmin.toString() === user) {
      await classRoom.deleteOne();
      res.status(200).json("Class deleted!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addToClass = async (req, res) => {
  const { classId, userId } = req.body;

  const addedClass = await classModel
    .findByIdAndUpdate(classId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("classAdmin", "-password");

  if (!addedClass) {
    res.status(404).json("Class not Found");
  } else {
    res.send(addedClass);
  }
};

export const removeFromClass = async (req, res) => {
  const { classId, userId } = req.body;

  const addedClass = await classModel
    .findByIdAndUpdate(classId, { $pull: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("classAdmin", "-password");

  if (!addedClass) {
    res.status(404).json("Class not Found");
  } else {
    res.send(addedClass);
  }
};
