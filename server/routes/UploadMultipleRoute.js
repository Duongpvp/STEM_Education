import express from "express";
const router = express.Router();
import multer from "multer";

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
    console.log(file);
  },
});

const uploadMultiple = multer({ storage: storageFile });

router.post("/", uploadMultiple.array("file", 15), (req, res) => {
  try {
    return res.status(200).json("Files uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
