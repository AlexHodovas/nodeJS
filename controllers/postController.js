const createPath = require("../helpers/createPath");
const PostModel = require("../models/post");

const handleError = (name, err, res) => {
  console.log(`${name} err`, err);
  res.status(404).sendFile(createPath("error"));
};

const getPosts = (req, res) => {
  PostModel.find()
    .sort({ createdAt: 1 })
    .then((posts) => {
      console.log("getPostsFromDB result", posts);
      res.send(posts);
    })
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
    .then((result) => {
      console.log("addPost newPost result", result);
      // res.send(result);
      res.redirect("/posts");
    })
    .catch((err) => handleError("addPost", err, res));
};

const deletePost = (req, res) => {
  console.log("deletePost req.query, req.params", req.params);
  const { id } = req.params;

  PostModel.findByIdAndDelete(id)
    .then((result) => {
      console.log("deletePost result", result);
      res.sendStatus(200);
    })
    .catch((err) => handleError("deletePost", err, res));
};

const editPost = (req, res) => {
  console.log("editPost req.query, req.params", req.params);
  const { id } = req.params;
  const { title, author, text } = req.body;

  PostModel.findByIdAndUpdate(id, { title, author, text })
    .then((result) => {
      console.log("/editPost result", result);
      res.sendStatus(200);
    })
    .catch((err) => handleError("editPost", err, res));
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  editPost,
};
