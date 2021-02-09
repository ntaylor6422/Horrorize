const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const apiRoutes = require("./routes/allRoutes");
const users = require("./routes/users");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/", apiRoutes);
app.use("/users", users);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
