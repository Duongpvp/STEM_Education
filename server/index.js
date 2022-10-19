import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import AuthRoute from "./routes/AuthRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import ClassPostRoute from "./routes/ClassPostRoute.js";
import ClassRoute from "./routes/ClassRoute.js";
import ExerciseRoute from "./routes/ExerciseRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadMultipleRoute from "./routes/UploadMultipleRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import UserRoute from "./routes/UserRoute.js";
import googleStra from "passport-google-oauth20";
import githubStra from "passport-github2";
import facebookStra from "passport-facebook";

dotenv.config();

// Routes
const app = express();

// Server image for public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Server cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["stem_education"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Server use Passport session
app.use(passport.initialize());
app.use(passport.session());

var GoogleStrategy = googleStra.Strategy;
var GitHubStrategy = githubStra.Strategy;
var FacebookStrategy = facebookStra.Strategy;

const GOOGLE_CLIENT_ID = "583221564921-c208tvbemobm94917h5aknicij4nvgf0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "b26b431b06b741437cc8";
const GITHUB_CLIENT_SECRET = "c9cd241f355cb93370d2caf216b64b365a050610";

const FACEBOOK_APP_ID = '484125413733962'
const FACEBOOK_APP_SECRET = '0254aee612f28b82d6366502a1f3ef0f'

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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
app.use("/uploadmultiple", UploadMultipleRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/class", ClassRoute);
app.use("/exercise", ExerciseRoute);
app.use("/classpost", ClassPostRoute);
