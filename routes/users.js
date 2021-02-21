const express = require("express");
const { login, createUser, getUser } = require("../backend/Controllers/Users");

const router = express.Router();

router.route("/:email").get(getUser);

router.route("/login").post(login);

router.route("/create").post(createUser);

module.exports = router;
