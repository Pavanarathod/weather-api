const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geoCode = require("./utils/geocode");
const foreCost = require("../../weather-app/utils/geocost");

const app = express();
const loc = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsName = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsName);
app.use(express.static(loc));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "pavan pattinson",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an adress",
    });
  }
  geoCode(req.query.address, (error, { lat, lang, place_name } = {}) => {
    if (error) {
      return res.send({ error });
    }
    foreCost(place_name, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: place_name,
        result: `Currently temprature in ${weatherData.name} is ${weatherData.temp} and weather is ${weatherData.weather}`,
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/product", (request, response) => {
  response.send({
    products: [],
  });
});

app.get("*", (request, response) => {
  response.render("error_page");
});

app.listen(5000, () => {
  console.log("server running");
});
