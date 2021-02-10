const express = require("express");
const Movie = require("../backend/Controllers/Movies");
const Comment = require("../backend/Controllers/Comments");
const Rating = require("../backend/Controllers/Ratings");

const router = express.Router();

// router.route("/:title").get(Movie.getMovieByTitle);
router.route("/:movieid").get(Movie.getMovieById);
router.route("/:movieid/comment").post(Comment.createComment);
router.route("/:movieid/rating").post(Rating.createRating);
router.route("/").post(Movie.createMovie);

module.exports = router;
