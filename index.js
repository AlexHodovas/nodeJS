const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;
const createPath = (page) =>
  path.resolve(__dirname, "nodeJsBasic/baseRouting", `${page}.html`);

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

app.get("/page2", (req, res) => {
  res.sendFile(createPath("page2"));
});

app.get("/page3", (req, res) => {
  res.redirect("/page2");
});

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
