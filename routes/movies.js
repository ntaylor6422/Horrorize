const express = require("express");
const controller = require("../backend/Controllers/Movies");
const Comment = require("../backend/Controllers/Comments");
const Rating = require("../backend/Controllers/Ratings");

const router = express.Router();

router.route("/:title").get(controller.getMovieByTitle);
router.route("/:movieid").get(controller.getMovieById);
router.route("/:movieid/comment").post(Comment.createComment);
router.route("/:movieid/rating").post(Rating.createRating);
router.route("/").post(controller.createMovie);

module.exports = router;
