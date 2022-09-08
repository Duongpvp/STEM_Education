import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
  },
  {
    timestamps: true,
  }
);

var messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
