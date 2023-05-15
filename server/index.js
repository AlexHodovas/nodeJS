const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

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

app.get("/page2", (req, res) => {
  res.sendFile(createPath("page2"));
});

app.post("/postUrl", (req, res) => {
  console.log("/postUrl body", req.body);
  res.send(req.body);
});

app.get("/page3", (req, res) => {
  res.redirect("/page2");
});

app.use((req, res) => {
  res.status(404).sendFile(createPath("error"));
});
