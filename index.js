const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require("body-parser");
// const methodOverride = require("method-override");

app.use(morgan('common'));
app.use(express.static('public'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

let movies = [
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
  ],
  users = [
    {
      username: "User A",
      id: "1"
    },
    {
      username: "User B",
      id: "2"
    },
    {
      username: "User C",
      id: "3"
    },
    {
      username: "User D",
      id: "4"
    },
    {
      username: "User E",
      id: "5"
    }
  ],
  directors = [
    {
      name: "Steven Spielburg",
      birthYear: "1946"
    },
    {
      name: "Martin Scorsese",
      birthYear: "1942"
    },
    {
      name: "Quentin Tarantino",
      birthYear: "1963"
    },
    {
      name: "Tim Burton",
      birthYear: "1958"
    },
    {
      name: "Francis Ford Coppola",
      birthYear: "1939"
    },
    {
      name: "Christopher Nolan",
      birthYear: "1970"
    },
    {
      name: "David Fincher",
      birthYear: "1962"
    },
    {
      name: "Spike Lee",
      birthYear: "1957"
    },
    {
      name: "Ridley Scott",
      birthYear: "1937"
    },
    {
      name: "Kathryn Bigelow",
      birthYear: "1951"
    }
  ];

app.get("/", (req, res) => {
  res.send("Welcome to my movie club!");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

// data about the genre by title
app.get("movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

//list of all the users
app.get("/users", (req, res) => {
  console.log("test");
  res.json(users);
});

//info on director by name
app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find(director => {
      return director.name === req.params.name;
    })
  );
});

//user's data by name
app.get("/users/:username", (req, res) => {
  res.json(
    users.find(user => {
      return user.username === req.params.username;
    })
  );
});

//adding new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Deletes a user by ID
app.delete("/users/:id", (req, res) => {
  let user = users.find(user => {
    return user.id === req.params.id;
  });

  if (user) {
    users = users.filter(obj => {
      return obj.id !== req.params.id;
    });
    res.status(201).send("User " + req.params.id + " was deleted.");
  }
});

// Add a movie to favorites
app.post("/users/:username/favorites", (req, res) => {
  let newfavorite = req.body;

  if (!newfavorite.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    res.send("Succesful POST request - new title added to favs.");
  }
});

// Remove a movie from favorites
app.delete("/users/:username/favorites", (req, res) => {
  let toRemove = req.body;

  if (!toRemove.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    res.send("Succesful DELETE request - title removed from favs.");
  }
});

// Update the username
app.put("/users/:username", (req, res) => {
  let user = users.find(user => {
    return user.username === req.params.username;
  });

  if (user) {
    user[req.params.username] = parseInt(req.params.username);
    res
      .status(201)
      .send(
        "Sucsessful PUT request: User " +
          req.params.username +
          " changed his username."
      );
  } else {
    res
      .status(404)
      .send("User with the name " + req.params.username + " was not found.");
  }
});

//list of favs of a single user
app.get("/users/:username/favorites", (req, res) => {
  res.send(
    "Successful GET request returning data on favorite movies of a single user."
  );
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

var http = require('http');


//Lets define a port we want to listen to
const PORT=8080;

var server = http.createServer(handleRequest);

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
