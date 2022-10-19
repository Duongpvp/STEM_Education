import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ mess: "username is already registered!" });
    }
    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );

    if (req.body.role === "Admin") {
      const outputUser = await newUser.update(
        { isAdmin: true, isTeacher: false },
        { new: true }
      );
      console.log(outputUser);
      res.status(200).json({ outputUser, token });
    } else {
      if (req.body.role === "Teacher") {
        const outputUser = await newUser.update(
          { isAdmin: false, isTeacher: true },
          { new: true }
        );
        console.log(outputUser);
        res.status(200).json({ outputUser, token });
      } else {
        const outputUser = await newUser.update(
          { isAdmin: false, isTeacher: false },
          { new: true }
        );
        console.log(outputUser);
        res.status(200).json({ outputUser, token });
      }
    }
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRETKEY,
          { expiresIn: "24h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Outside User
export const loginOutsideUser = async (req, res) => {
  const { userId, firstname, lastname, avatar } = req.body;

  try {
    const user = await UserModel.findOne({ outsideId: userId });
    const token = jwt.sign(
      {
        username: userId,
        id: userId,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "24h" }
    );
    if (user) {
      console.log("User nè");
      res.status(200).json({ user, token });
    } else {
      console.log("Tạo user");
      const outsideUser = {
        username: userId,
        firstname: firstname,
        lastname: lastname,
        profilePicture: avatar,
        outsideId: userId
      };
      const newUser = new UserModel(outsideUser);
      const user = await newUser.save();
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
