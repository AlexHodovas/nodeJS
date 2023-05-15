const PostModel = require("../models/post");

const handleError = (name, err, res) => {
  console.log(`${name} err`, err);
  res.status(500).send(error);
};

const getPosts = (req, res) => {
  PostModel.find()
    .sort({ createdAt: 1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => handleError("getPosts", err, res));
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  console.log("addPost body", req.body);

  const newPost = new PostModel({
    title,
    author,
    text,
  });

  newPost
    .save()
    .then((post) => res.status(200).json(post))
    .catch((err) => handleError("addPost", err, res));
};

const deletePost = (req, res) => {
  console.log("deletePost req.query, req.params", req.params);
  const { id } = req.params;

  PostModel.findByIdAndDelete(id)
    .then(() => res.status(200).json(id))
    .catch((err) => handleError("deletePost", err, res));
};

const editPost = (req, res) => {
  console.log("editPost req.query, req.params", req.params);
  const { id } = req.params;
  const { title, author, text } = req.body;

  PostModel.findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((err) => handleError("editPost", err, res));
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  editPost,
};
