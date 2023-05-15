const express = require("express");
const app = express();
const path = require("path");
const createPath = require("../helpers/createPath");

const PORT = 3000;

app.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get("/", (req, res) => {
  // res.send('<h3>Hello</h3>'); // автоматичеки понимает тип данных
  // res.send({ a: '123'});
  // res.json([{ a: "123" }]);
  // console.log("createPath('page1')", createPath("page1"));
  res.sendFile(createPath("page1"));
});

app.get("/posts", (req, res) => {
  res.sendFile(createPath("posts"));
});

app.get("/page3", (req, res) => {
  res.redirect("/posts");
});

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
