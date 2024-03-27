// import the required modules needed
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
// define the variable for the server
const server = express();
const PORT = 3000;
global.DEBUG = true;

// set the view engine to ejs
server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// define the route for the server
server.get("/", (req, res) => {
  res.render("index.ejs", { name: "Daniel" });
});
// define the route for the students page
const studentsRouter = require("./routes/students");
server.use("/students", studentsRouter);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
