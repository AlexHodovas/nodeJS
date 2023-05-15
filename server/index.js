const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postApiRoutes = require("../routes/api-post-routes");
const initRoutes = require("../routes/init-routes");
const postRoutes = require("../routes/post-router");
const contactRoutes = require("../routes/contact-router");
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

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(db, {
//   useUnifiedTopology: true,
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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

app.use(express.static("styles"));
// + это если мы на "/" возвращаем
// res.sendFile(createPath("page1"));

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

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
