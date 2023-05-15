const express = require("express");
const router = express.Router();
const createPath = require("../helpers/createPath");
const {
  getPosts,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/postController");

router.get("/add-post", (req, res) => {
  res.sendFile(createPath("posts"));
});
router.get("/posts", getPosts);
router.delete("/posts/:id", deletePost);
router.put("/edit-post/:id", editPost);
router.post("/postUrl", addPost);

module.exports = router;
