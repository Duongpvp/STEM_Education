import express from "express";
import {
  addToClass,
  allClass,
  createClass,
  deleteClass, removeFromClass,
  updateClass
} from "../controllers/ClassController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/:userId").get(authMiddleWare, allClass);
router.route("/:id").put(authMiddleWare, updateClass);
router.route("/createclass").post(authMiddleWare, createClass);
router.route("/:id").delete(authMiddleWare, deleteClass);
router.route("/classadd/adduser").put(authMiddleWare, addToClass);
router.route("/classremove/removeuser").put(authMiddleWare, removeFromClass);

export default router;
