const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require("mongodb");

const PostModel = require("../models/post");
const ContactModel = require("../models/contact");

const db =
  "mongodb+srv://Alex:0994953911@cluster1.ftqozxv.mongodb.net/nodeJS?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("mongoose ok");
  })
  .catch((e) => {
    console.log("mongoose catch error", e);
  });

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

const mockedDataExample = {
  country: "Ukraine",
  cities: [
    {
      id: "0",
      name: "Kyiv",
    },
    {
      id: "1",
      name: "Sumy",
    },
  ],
};

const pagesInfoExample = [{ page1: "page1" }, { page2: "page2" }];

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "../html", `${page}.html`);

app.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
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

app.get("/", (req, res) => {
  // res.send('<h3>Hello</h3>'); // автоматичеки понимает тип данных
  // res.send({ a: '123'});
  // res.json(mockedDataExample.country);
  res.sendFile(createPath("page1"));
});

app.get("/country", (req, res) => {
  res.json(mockedDataExample.country);
});

app.get("/country/:cityId", (req, res) => {
  console.log("/country:cityId req.query, req.params", req.query, req.params);

  const cityIdParams = req.params.cityId;
  console.log("/country:cityId cityIdParams", cityIdParams);

  const selectedCity = mockedDataExample.cities.find(
    (city) => city.id === cityIdParams
  );
  console.log("/country:cityId selectedCity", selectedCity);

  res.json(selectedCity);
});

app.get("/add-post", (req, res) => {
  res.sendFile(createPath("posts"));
});

app.get("/posts-from-db", (req, res) => {
  PostModel.find()
    .sort({ createdAt: 1 })
    .then((posts) => {
      console.log("/posts-from-db result", posts);
      res.send(posts);
    })
    .catch((err) => {
      console.log("/posts-from-db err", err);
      res.status(404).sendFile(createPath("error"));
    });
});

app.delete("/posts-from-db/:id", (req, res) => {
  console.log("/posts-from-db/:id req.query, req.params", req.params);
  const { id } = req.params;

  PostModel.findByIdAndDelete(id)
    .then((result) => {
      console.log("/posts-from-db/:id result", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("/posts-from-db/:id err", err);
      res.status(404).sendFile(createPath("error"));
    });
});

app.put("/edit-post/:id", (req, res) => {
  console.log("/edit-post/:id req.query, req.params", req.params);
  const { id } = req.params;
  const { title, author, text } = req.body;

  PostModel.findByIdAndUpdate(id, { title, author, text })
    .then((result) => {
      console.log("/edit-post/:id result", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("/edit-post/:id err", err);
      res.status(404).sendFile(createPath("error"));
    });
});

app.get("/contacts", (req, res) => {
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

app.post("/postUrl", (req, res) => {
  const { title, author, text } = req.body;
  console.log("/postUrl body", req.body);

  const newPost = new PostModel({
    title,
    author,
    text,
  });

  newPost
    .save()
    .then((result) => {
      console.log("/postUrl newPost result", result);
      // res.send(result);
      res.redirect("/posts-from-db");
    })
    .catch((err) => {
      console.log("/postUrl newPost err", err);
      res.status(404).sendFile(createPath("error"));
    });
});

app.get("/page3", (req, res) => {
  res.redirect("/add-post");
});

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
