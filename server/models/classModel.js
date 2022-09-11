import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    className: { type: "String", trim: true },
    snippet: {type: "String", trim: true},
    image: String,
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    classAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

var classModel = mongoose.model("Class", classSchema);
export default classModel;
