import express from "express";
import {
  addToClass,
  createClass,
  deleteClass,
  getAllClass,
  getClass,
  getUserClass,
  joinClass,
  removeFromClass,
  updateClass,
  updateImgClass,
} from "../controllers/ClassController.js";

const router = express.Router();

router.route("/").get(getAllClass);
router.route("/:userId").get(getClass);
router.route("/getuserclass/:id").get(getUserClass);
router.route("/:id").put(updateImgClass);
router.route("/join/:id").put(joinClass)
router.route("/update/:id").put(updateClass);
router.route("/createclass").post(createClass);
router.route("/deleteclass/:id").put(deleteClass);
router.route("/classadd/adduser").put(addToClass);
router.route("/classremove/removeuser").put(removeFromClass);

export default router;
