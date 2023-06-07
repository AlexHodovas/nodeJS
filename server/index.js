const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const apiPostsRoutes = require("../routes/apiPostsRoutes");
const initRoutes = require("../routes/init-routes");
const postRoutes = require("../routes/post-router");
const contactRoutes = require("../routes/contact-router");
const imageRoutes = require("../routes/img-routes");
const createPath = require("../helpers/createPath");
const logErrors = require("../helpers/logErrors");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose ok"))
  .catch((e) => console.log("mongoose error", e));

// middleware нужно добавлять перед роутингом

app.use(
  (req, res, next) => {
    console.log(`CUSTOM middleware 1 req.method --> ${req.method}`);
    next(); // без next не пойдет дальше
  },
  (req, res, next) => {
    console.log(`CUSTOM middleware 2`);
    next();
  }
);

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
app.use("/posts", postRoutes);
app.use("/api/posts", apiPostsRoutes);
app.use(contactRoutes);
app.use(imageRoutes);
app.use(logErrors);

app.listen(process.env.PORT, "localhost", (error) => {
  error
    ? console.log(error)
    : console.log(`listening port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
  console.log(`ERROR middleware err`, err);
  res.status(500).json({ err: `ERROR middleware err ${err}` });
  // res.status(404).sendFile(createPath("error"));
});
