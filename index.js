const express = require("express");
morgan = require('morgan');

const app = express();

app.use(morgan)('common'));

let topMovies = [
  {
    title: "Snatch",
    year: "2000",
    genre: "Crime Comedy"
  },
  {
    title: "Pretty in Pink",
    year: "1986",
    genre: "Teen/Romance/Comedy"
  },
  {
    title: "Good Will Hunting",
    year: "1997",
    genre: "Drama"
  },
  {
    title: "Kung Fu Panda",
    year: "2008",
    genre: "Animated/Kids"
  },
  {
    title: "Rocknrolla",
    year: "2008",
    genre: "Crime Comedy"
  },
  {
    title: "Always Be My Maybe",
    year: "2019",
    genre: "Romantic Comedy"
  },
  {
    title: "Forrest Gump",
    year: "1994",
    genre: "Drama"
  },
  {
    title: "The Shawshank Redemption",
    year: "1994",
    genre: "Drama"
  },
  {
    title: "The Green Mile",
    year: "1999",
    genre: "Drama"
  },
  {
    title: "The Departed",
    year: "2006",
    genre: "Drama"
  }
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie club!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topBooks);
});

app.use(express.static('public'));

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
