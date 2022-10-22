import express from "express";
import {
  accessChat,
  addToGroup,
  createGroup,
  fetchChat,
  removeGroup,
  renameGroup,
} from "../controllers/ChatController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/").post(accessChat);
router.route("/").get(fetchChat);
router.route("/group").post(createGroup);
router.route("/rename").put(renameGroup);
router.route("/groupadd").put(addToGroup);
router.route("/groupremove").put(removeGroup);

export default router;
