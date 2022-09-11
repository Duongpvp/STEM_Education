import express from "express";
import {
  addToClass, createClass,
  deleteClass, getAllClass, getClass, removeFromClass,
  updateClass
} from "../controllers/ClassController.js";

const router = express.Router();

router.route("/").get(getAllClass)
router.route("/:userId").get(getClass);
router.route("/:id").put(updateClass);
router.route("/createclass").post(createClass);
router.route("/:id").delete(deleteClass);
router.route("/classadd/adduser").put(addToClass);
router.route("/classremove/removeuser").put(removeFromClass);

export default router;
