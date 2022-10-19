import express from "express";
import multer from "multer";
import fs from "fs";
import { promisify } from "util";

const router = express.Router();
const unlinkAsync = promisify(fs.unlink);
const serverPublicDirect = process.env.REACT_FILE_DIR

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

router.post("/deleted", upload.single("file"), async (req, res) => {
  try {
    await unlinkAsync(`${serverPublicDirect}/${req.body.path}`)
    return res.status(200).json("File deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

export default router;
