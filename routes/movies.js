const express = require("express");
const controller = require("../backend/Controllers/Movies");
const Comment = require("../backend/Controllers/Comments");

const router = express.Router();

router.route("/:title").get(controller.getMovieByTitle);
router.route("/:movieid/comment").post(Comment.createComment);
router.route("/").post(controller.createMovie);

module.exports = router;
