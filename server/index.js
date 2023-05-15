const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postApiRoutes = require("../routes/api-post-routes");
const initRoutes = require("../routes/init-routes");
const postRoutes = require("../routes/post-router");
const contactRoutes = require("../routes/contact-router");
const imageRoutes = require("../routes/img-routes");
const createPath = require("../helpers/createPath");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose ok"))
  .catch((e) => console.log("mongoose error", e));

app.listen(process.env.PORT, "localhost", (error) => {
  error
    ? console.log(error)
    : console.log(`listening port ${process.env.PORT}`);
});

// middleware нужно добавлять перед роутингом

app.use((req, res, next) => {
  // middleware
  console.log(`req.method --> ${req.method}`);
  console.log(`middleware`);
  next();
});

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
// это middleware
// парсинг входящих запросов

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(initRoutes);
app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);
app.use(imageRoutes);

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
