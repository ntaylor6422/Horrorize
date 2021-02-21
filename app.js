const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const apiRoutes = require("./routes/allRoutes");
const users = require("./routes/users");
const movies = require("./routes/movies");
const jmw = require("express-jwt");

app.use(express.json());
app.use(cookieParser());
app.use(
  jmw({
    secret: process.env.ACCESS_TOKEN_SECRET,
    credentialsRequired: false,
    getToken: (req) => req.cookies.token,
    algorithms: ["HS256"],
  })
);

app.use(express.static(path.resolve(__dirname, ".", "dist")));

app.use("/api/", apiRoutes);
app.use("/users", users);
app.use("/movie", movies);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, ".", "dist", "index.html"));
});

module.exports = app;
