import express from "express";
import {
  createClassPost,
  deleteClassPost,
  getAPost,
  getClassPost,
  updateClassPost,
} from "../controllers/ClassPostController.js";
import authMiddleWare from '../MiddleWare/authMiddleWare.js';

const router = express.Router();

router.post("/", authMiddleWare, createClassPost);
router.get("/exc/:id", authMiddleWare, getAPost);
router.get("/:id", authMiddleWare, getClassPost);
router.put("/updatePost/:id", authMiddleWare, updateClassPost);
router.put("/deletedpost/:id", authMiddleWare, deleteClassPost);

export default router;
