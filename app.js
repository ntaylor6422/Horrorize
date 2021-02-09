const express = require("express");
const cookieParser = require("cookie-parser");
const { checkToken } = require("./auth");
const path = require("path");
const apiRoutes = require("./routes/allRoutes");
const users = require("./routes/users");
const movies = require("./routes/movies");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, ".", "dist")));

app.get("/api/", checkToken());
app.use("/api/", apiRoutes);
app.use("/users", users);
app.use("/movie", movies);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
});

module.exports = app;
