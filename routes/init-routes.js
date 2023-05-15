const express = require("express");
const router = express.Router();
const createPath = require("../helpers/createPath");

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

router.get("/", (req, res) => {
  // res.send('<h3>Hello</h3>'); // автоматичеки понимает тип данных
  // res.send({ a: '123'});
  // res.json(mockedDataExample.country);
  res.sendFile(createPath("page1"));
});

router.get("/country", (req, res) => {
  res.json(mockedDataExample.country);
});

router.get("/country/:cityId", (req, res) => {
  console.log("/country:cityId req.query, req.params", req.query, req.params);

  const cityIdParams = req.params.cityId;
  console.log("/country:cityId cityIdParams", cityIdParams);

  const selectedCity = mockedDataExample.cities.find(
    (city) => city.id === cityIdParams
  );
  console.log("/country:cityId selectedCity", selectedCity);

  res.json(selectedCity);
});

router.get("/page3", (req, res) => {
  res.redirect("/add-post");
});

module.exports = router;
