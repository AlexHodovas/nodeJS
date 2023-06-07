const express = require("express");
const router = express.Router();
const createPath = require("../helpers/createPath");
const {
  getPosts,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/postController");

router.get("", getPosts);

router.get("/add", (req, res) => {
  res.sendFile(createPath("posts"));
});

router.delete("/:id", deletePost);
router.put("/:id", editPost);
router.post("/addPost", addPost);

module.exports = router;
