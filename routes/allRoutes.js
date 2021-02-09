const express = require("express");
const controller = require("../backend/Controllers/Comments");

const router = express.Router();

router.route("/comments/:displayname").get(controller.getAllComments);

router.route("/comments/:id");

module.exports = router;
