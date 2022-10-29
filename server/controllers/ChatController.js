import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";

export const accessChat = async (req, res) => {
  const userId = req.body.id;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.body._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "username firstname lastname followers following outsideId",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.body._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);
      const FullChat = await ChatModel.findOne({ _id: createdChat._id });
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

export const fetchChat = async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.body._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updateAt: -1 })
    .then(async (result) => {
      result = await UserModel.populate(result, {
        path: "latestMessage.sender",
        select: "username firstname lastname followers outsideId",
      });
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ mess: "Please fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.body._id);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.body._id,
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404).json("Chat not Found !");
  } else {
    res.send(updatedChat);
  }
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedChat) {
    res.status(404).json("Chat not Found");
  } else {
    res.send(addedChat);
  }
};

export const removeGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedChat) {
    res.status(404).json("Chat not Found");
  } else {
    res.json(removedChat);
  }
};
