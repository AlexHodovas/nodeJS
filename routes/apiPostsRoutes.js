const express = require("express");
const router = express.Router();
const {
  getPosts,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/apiPostController");

router.get("", getPosts);
router.delete("/:id", deletePost);
router.put("/:id", editPost);
router.post("/add", addPost);

module.exports = router;
