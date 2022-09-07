import ChatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";

export const allMessages = async (req, res) => {
  try {
    const message = await messageModel
      .find({
        chat: req.params.chatId,
      })
      .populate("sender", "firstname lastname followers following username profilePicture")
      .populate("chat");

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res.status(400).send("Invalid data passed into request");
  }

  var newMessage = {
    sender: req.body._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "firstname lastname followers following profilePicture");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "firstname lastname followers following username",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json(message);
  } catch (error) {
    req.status(400).json(error);
  }
};
