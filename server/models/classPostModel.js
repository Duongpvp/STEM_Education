import mongoose from "mongoose";

const classPostSchema = mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Class",
    },
    postTitle: {type: String, require: true},
    desc: String,
    files: [],
  },
  { timestamps: true }
);

var classPostModel = mongoose.model("ClassPost", classPostSchema);
export default classPostModel;
