import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import nodeMailer from "nodemailer";

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
      res.status(200).json({ user, token });
    } else {
      const outsideUser = {
        username: userId,
        firstname: firstname,
        lastname: lastname,
        profilePicture: avatar,
        outsideId: userId,
      };
      const newUser = new UserModel(outsideUser);
      const user = await newUser.save();
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMailer = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "duongb1807625@student.ctu.edu.vn",
        pass: "DRDq2cz7",
      },
    });

    const mailOptions = {
      from: "duongb1807625@student.ctu.edu.vn",
      to: "duong891109@gmail.com",
      subject: "Sending Email With React And Nodejs",
      html: "<img src='https://blognhanpham.com/wp-content/uploads/2021/01/tommy-shelby-6.jpg' alt='' />",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(info);
        console.log("Error : " + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
};
