const express = require("express");
const controller = require("../backend/Controllers/Movies");

const router = express.Router();

router.route("/:title", controller.getMovieByTitle);

module.exports = router;
