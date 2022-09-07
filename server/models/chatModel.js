import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: { type: "String", trim: true },
    isGroupChat: { type: "Boolean", default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

var ChatModel = mongoose.model("Chats", chatSchema);
export default ChatModel;
