const express = require("express");
const path = require("path");
const fs = require("fs");

// creating a server
const app = express();

// Setting a port listener
const PORT = process.env.PORT || 3001;

//  createNoteData Array
let createNoteData = [];

// Setting up middleware body parsing, static, and route
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// api call response for the notes, an having results sent to browser in the form of an array of object
app.get("/api/notes", function (err, res) {
  try {
    createNoteData = fs.readFileSync("db/db.json", "utf8");
    console.log("Note written");
    createNoteData = JSON.parse(createNoteData);
  } catch (err) {
    console.log("\n error (catch err app.get):");
    console.log(err);
  }
  res.json(createNoteData);
});

// writes the new note to the json file and sends it back to the browser
app.post("/api/notes", function (req, res) {
  try {
    createNoteData = fs.readFileSync("./db/db.json", "utf8");
    console.log(createNoteData);
    createNoteData = JSON.parse(createNoteData);
    req.body.id = createNoteData.length;
    createNoteData.push(req.body);
    createNoteData = JSON.stringify(createNoteData);
    fs.writeFile("./db/db.json", createNoteData, "utf8", function (err) {
      if (err) throw err;
    });

    res.json(JSON.parse(createNoteData));
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// //

app.delete("/api/notes/:id", function (req, res) {
  try {
    createNoteData = fs.readFileSync("./db/db.json", "utf8");
    createNoteData = JSON.parse(createNoteData);
    createNoteData = createNoteData.filter(function (note) {
      return note.id != req.params.id;
    });
    createNoteData = JSON.stringify(createNoteData);

    fs.writeFile("./db/db.json", createNoteData, "utf8", function (err) {
      if (err) throw err;
    });

    res.send(JSON.parse(createNoteData));
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// HTML GET Requests

// when Get start button is clicked display the note.html Web page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// If no matching route is found, then default to home
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

// Start the server on the port
app.listen(PORT, function () {
  console.log("http//localhost: " + PORT);
});
