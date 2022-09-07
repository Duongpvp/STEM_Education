import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AuthRoute from "./routes/AuthRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import UserRoute from "./routes/UserRoute.js";
import UploadMultipleRoute from "./routes/UploadMultipleRoute.js"

// Routes
const app = express();

// Server image for public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


dotenv.config();

// Connect to Mongo Database
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(5000, () => {
      console.log(`Connected to MongoDB server on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/uploadmultiple", UploadMultipleRoute)
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
