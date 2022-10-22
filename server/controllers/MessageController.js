import ChatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";

export const allMessages = async (req, res) => {
  try {
    const message = await messageModel
      .find({
        chat: req.params.chatId,
      })
      .populate("sender", "firstname lastname followers following username profilePicture outsideId")
      .populate("chat");

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const sendMessage = async (req, res) => {
  const { chatId, content, senderId } = req.body;

  if (!chatId || !content) {
    return res.status(400).send("Invalid data passed into request");
  }

  var newMessage = {
    sender: senderId,
    content: content,
    chat: chatId,
  };

  console.log(newMessage);
  try {
    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "firstname lastname followers following profilePicture outsideId");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "firstname lastname followers following username outsideId",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json(error);
  }
};
