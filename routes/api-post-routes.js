const express = require("express");
const router = express.Router();
const {
  getPosts,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/apiPostController");

router.get("/api/posts", getPosts);
router.delete("/api/posts/:id", deletePost);
router.put("/api/edit-post/:id", editPost);
router.post("/api/postUrl", addPost);

module.exports = router;
