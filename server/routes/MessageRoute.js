import express from "express";
import { allMessages, sendMessage } from "../controllers/MessageController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.route("/").post(authMiddleWare, sendMessage);
router.route("/:chatId").get(allMessages);

export default router;
