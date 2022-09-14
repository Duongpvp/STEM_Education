import express from "express";
import {
  createClassPost,
  deleteClassPost,
  getAPost,
  getClassPost,
  updateClassPost,
} from "../controllers/ClassPostController.js";

const router = express.Router();

router.post("/", createClassPost);
router.get("/exc/:id", getAPost);
router.get("/:id", getClassPost);
router.put("/:id", updateClassPost);
router.delete("/:id", deleteClassPost);

export default router;
