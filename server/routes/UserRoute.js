import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUser,
  searchUser,
  editRole,
} from "../controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.put("/editRole/:id", authMiddleWare, editRole)
router.get("/search/find", authMiddleWare, searchUser);
router.put("/delete/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unFollowUser);

export default router;
