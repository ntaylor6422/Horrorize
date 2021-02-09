const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  movietitle: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
});

const commentSchema = new mongoose.Schema({
  movietitle: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  datecommented: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  ratings: [ratingSchema],
});

const movieSchema = new mongoose.Schema({
  movietitle: {
    type: String,
    required: true,
  },
  comments: {
    type: [commentSchema],
  },
  ratings: [Number],
  releasedate: Date,
  summary: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Rating = mongoose.model("Rating", ratingSchema);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  User,
  Comment,
  Rating,
  Movie,
};
