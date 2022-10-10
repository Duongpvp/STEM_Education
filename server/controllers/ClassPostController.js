import classPostModel from "../models/classPostModel.js";

export const createClassPost = async (req, res) => {
  const { classId, postTitle, desc } = req.body;
  const listFile = JSON.parse(req.body.files);
  try {
    if (!req.body) {
      return res.status(400).json("Invalid data passed into request");
    }
    var newPost = {
      classId: classId,
      postTitle: postTitle,
      desc: desc,
      files: listFile,
    };
    try {
      var post = await classPostModel.create(newPost);
      post = await post.populate("classId")
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
    // const newPost = new classPostModel(req.body);
    // try {
    //   await newPost.save();
    //   res.status(200).json(newPost);
    // } catch (error) {
    //   console.log(error);
    // }
  } catch (error) {
    res.status(500).json(error)
  }
};

export const getAPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await classPostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getClassPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await classPostModel.find({ classId: id });
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a Post
export const updateClassPost = async (req, res) => {
  const postId = req.params.id;
  const { classId } = req.body;

  try {
    const post = await classPostModel.findById(postId);
    if (post.classId.toString() === classId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Post
export const deleteClassPost = async (req, res) => {
  const id = req.params.id;
  const { classId } = req.body;

  try {
    const post = await classPostModel.findById(id);
    if (post.classId.toString() === classId) {
      await post.deleteOne();
      res.status(200).json("Post deleted!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
