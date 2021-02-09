const express = require("express");
const { login, createUser } = require("../backend/Controllers/Users");

const router = express.Router();

router.route("/login").post(login);

router.route("/create").post(createUser);

module.exports = router;
