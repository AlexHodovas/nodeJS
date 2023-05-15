const express = require("express");
const router = express.Router();
const multer = require("multer");

const createPath = require("../helpers/createPath");
const { addImage } = require("../controllers/imageController");

router.get("/image", (req, res) => {
  res.sendFile(createPath("imgPage"));
});

const upload = multer({ dest: ".../public/images/" });

router.post("/add-image", upload.single("uploaded_file"), addImage);

module.exports = router;
