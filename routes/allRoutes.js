const express = require("express");
const controller = require("../backend/Controllers/Comments");

const router = express.Router();

router.route("/comments/:displayname").get(controller.getAllComments);

router.route("/comments/:movieid").get(controller.getCommentsByMovieId);

module.exports = router;
