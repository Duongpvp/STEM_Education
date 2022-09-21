import express from "express";
const router = express.Router();
import multer from "multer";

const storageFile = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "public/files");
  },
  filename: (req, files, cb) => {
    cb(null, req.body.time + "__-__" + files.originalname);
  },
});

const uploadMultiple = multer({ storage: storageFile });

router.post("/", uploadMultiple.array("files", 30), (req, res) => {
  try {
    return res.status(200).json("Files uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
