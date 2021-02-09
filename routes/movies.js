const express = require("express");
const controller = require("../backend/Controllers/Movies");

const router = express.Router();

router.route("/:title").get(controller.getMovieByTitle);
router.route("/").post(controller.createMovie);

module.exports = router;
