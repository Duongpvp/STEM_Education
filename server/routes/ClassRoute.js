import express from "express";
import {
  addToClass,
  createClass,
  deleteClass,
  getAllClass, getClassForUser,
  getCurrentClass,
  getUserClass,
  joinClass,
  removeFromClass,
  updateClass,
  updateImgClass
} from "../controllers/ClassController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/").get(authMiddleWare, getAllClass);
router.route("/getcurrentclass/:classId").get(authMiddleWare, getCurrentClass); 
router.route("/getclassforuser/").get(authMiddleWare, getClassForUser);
router.route("/getuserclass/:id").get(authMiddleWare, getUserClass);
router.route("/:id").put(authMiddleWare, updateImgClass);
router.route("/join/:id").put(authMiddleWare, joinClass);
router.route("/update/:id").put(authMiddleWare, updateClass);
router.route("/createclass").post(authMiddleWare, createClass);
router.route("/deleteclass/:id").put(authMiddleWare, deleteClass);
router.route("/classadd/adduser").put(authMiddleWare, addToClass);
router.route("/classremove/removeuser").put(authMiddleWare, removeFromClass);

export default router;
