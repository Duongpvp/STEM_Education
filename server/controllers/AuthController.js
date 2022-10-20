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

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const generateString = (length) => {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const code = generateString(8);

    await newUser.update({ activeCode: code }, { new: true });

    if (req.body.role === "Admin") {
      const outputUser = await newUser.update(
        { isAdmin: true, isTeacher: false },
        { new: true }
      );
      res.status(200).json({ outputUser, token });
    } else {
      if (req.body.role === "Teacher") {
        const outputUser = await newUser.update(
          { isAdmin: false, isTeacher: true },
          { new: true }
        );
        res.status(200).json({ outputUser, token });
      } else {
        const outputUser = await newUser.update(
          { isAdmin: false, isTeacher: false },
          { new: true }
        );
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
    console.log(user);

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (user.activeCode) {
        res.status(400).json("User has not confirm active code");
      }
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

    const user = await UserModel.findOne({ username: email });

    const mailOptions = {
      from: "duongb1807625@student.ctu.edu.vn",
      to: "duong891109@gmail.com",
      subject: "Sending Email With React And Nodejs",
      html: `<h2>${user.activeCode}</h2>`,
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

export const verifyCode = async (req, res) => {
  const { username, receiveCode } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      if (user.activeCode === receiveCode) {
        const result = await user.update({ activeCode: "" }, { new: true });

        res.status(200).json({ user });
      } else {
        res.status(400).json("Code does not correct");
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const secret = process.env.JWT_SECRETKEY;
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        secret,
        { expiresIn: "10m" }
      );
      const link = `http://localhost:3000/auth/resetPassword/${user.username}/${user._id}/${token}}`;
      res.status(200).json({ link });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const resetPassword = async (req, res) => {
  const { userEmail, id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findOne({ userEmail });
    const secret = process.env.JWT_SECRETKEY;
    if (id !== user._id.toString()) {
      res.status(400).json("Invalid user id");
    } else {
      jwt.verify(token, secret);
      console.log("Before : ", user.password);
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const newPassword = hashedPass;
      await UserModel.findOneAndUpdate(
        { userEmail },
        { password: newPassword },
        { new: true }
      );
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
