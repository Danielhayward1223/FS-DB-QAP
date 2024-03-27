const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const server = express();
const PORT = 3000;
global.DEBUG = true;

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.render("index.ejs", { name: "Daniel" });
});

const studentsRouter = require("./routes/students");
server.use("/students", studentsRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
