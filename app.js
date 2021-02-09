const express = require("express");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/allRoutes");
const users = require("./routes/users");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/", apiRoutes);
app.use("/users", users);

module.exports = app;
