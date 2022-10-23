import express from "express";
import passport from "passport";
import {
  forgotPassword,
  loginOutsideUser,
  loginUser,
  registerUser,
  registerUserByAdmin,
  resetPassword,
  sendMailer,
  verifyCode,
} from "../controllers/AuthController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/register-by-admin", registerUserByAdmin);
router.post("/verifyCode", verifyCode);
router.post("/login", loginUser);
router.post("/loginOutside", loginOutsideUser);
router.post("/sendCode", sendMailer);
router.post("/forgotPassword", forgotPassword);
router.post(
  "/resetPassword/:userEmail/:id/:token",
  resetPassword
);

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfully",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;
