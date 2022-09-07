import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const uploadMultiple = multer({ storage: storage });

router.post("/", uploadMultiple.array("file", 12), (req, res) => {
  try {
    return res.status(200).json("Files uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
