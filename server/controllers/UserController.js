import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...ortherDetails } = user._doc;
      res.status(200).json(ortherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all user
export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();

    users = users.map((user) => {
      const { password, ...ortherDetails } = user._doc;
      return ortherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRETKEY,
        { expiresIn: "24h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access denied ! You can only update your own profile");
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied! You can only delete your own profile");
  }
};

// Search Users
export const searchUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { firstname: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await UserModel.find(keyword)
    .find({
      _id: { $ne: req.user_id },
    })
    
  res.send(users);
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is already followed by you ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed!");
      } else {
        res.status(403).json("User is not followed by you ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};