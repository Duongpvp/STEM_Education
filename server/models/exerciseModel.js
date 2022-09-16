import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    submission: { type: String, trim: true },
    files: [],
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "ClassPost" },
    grade: { type: Number },
  },
  {
    timestamps: true,
  }
);

var exerciseModel = mongoose.model("Exercise", exerciseSchema);
export default exerciseModel;
