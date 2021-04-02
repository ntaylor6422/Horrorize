require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const apiKey = process.env.MOVIE_API;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Listening");
    });
  });

module.exports = apiKey;
