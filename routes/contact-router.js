const express = require("express");
const router = express.Router();
const createPath = require("../helpers/createPath");
const ContactModel = require("../models/contact");

router.get("/contacts", (req, res) => {
  // res.sendFile(createPath("contacts"));

  ContactModel.find()
    // .sort({ createdAt: 1 })
    .then((contacts) => {
      console.log("/contacts result", contacts);
      res.send(contacts);
    })
    .catch((err) => {
      console.log("/contacts err", err);
      res.status(404).sendFile(createPath("error"));
    });
});

module.exports = router;
