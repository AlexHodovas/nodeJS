const PostModel = require("../models/post");

const getPosts = async (req, res, next) => {
  try {
    throw new Error("throw new Error in getPosts !!!");
    const posts = await PostModel.find().sort({ createdAt: 1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(`caught getPosts error`);
    next(error);
  }
};

const addPost = async (req, res) => {
  try {
    const { title, author, text } = req.body;

    const newPost = new PostModel({
      title,
      author,
      text,
    });

    const post = await newPost.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(`caught addPost error`);
    next(error);
  }
};

const deletePost = async (req, res) => {
  try {
    console.log("deletePost req.query, req.params", req.params);
    const { id } = req.params;
    const deletedId = await PostModel.findByIdAndDelete(id);

    return res.status(200).json(deletedId);
  } catch (error) {
    console.log(`caught deletePost error`);
    next(error);
  }
};

const editPost = async (req, res) => {
  try {
    console.log("editPost req.query, req.params", req.params);
    const { id } = req.params;
    const { title, author, text } = req.body;
    const editedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, author, text },
      { new: true }
    );

    return res.status(200).json(editedPost);
  } catch (error) {
    console.log(`caught editPost error`);
    next(error);
  }
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  editPost,
};
