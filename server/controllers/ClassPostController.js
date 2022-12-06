import classPostModel from "../models/classPostModel.js";

export const createClassPost = async (req, res) => {
  const { classId, postTitle, desc, deadline } = req.body;
  const listFile = JSON.parse(req.body.files);
  try {
    if (!req.body) {
      return res.status(400).json("Invalid data passed into request");
    }
    var newPost = {
      classId: classId,
      postTitle: postTitle,
      desc: desc,
      deadline: deadline,
      files: listFile,
    };
    try {
      var post = await classPostModel.create(newPost);
      post = await post.populate("classId");
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
    res.status(500).json(error);
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
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a Post
export const updateClassPost = async (req, res) => {
  const postId = req.params.id;
  const { classId } = req.body;
  console.log(req.body + "  VS  " + Date.now());
  try {
    const post = await classPostModel.findById(postId);
    if (post.classId.toString() === classId) {
      await post.updateOne(
        {
          postTitle: req.body.postTitle,
          desc: req.body.desc,
          deadline: req.body.deadline,
          files: req.body.files,
        },
        { new: true }
      );
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
  const { postId } = req.body;
  try {
    const post = await classPostModel.findById(postId);

    if (post._id.toString() === postId) {
      await post.deleteOne();
      res.status(200).json("Post deleted!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
