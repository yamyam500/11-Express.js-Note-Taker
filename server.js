const express = require("express");
const path = require("path");
const homeRoutes = require("./routes/homeroutes");
const apiRoutes = require("./routes/apiroutes");
// creating a server
const app = express();

// Setting a port listener
const PORT = process.env.PORT || 3001;

// Setting up middleware body parsing, static, and route
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(apiRoutes);
app.use(homeRoutes);

// Start the server on the port
app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});
