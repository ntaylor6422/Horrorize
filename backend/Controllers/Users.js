require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    res.status(201).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = async (req, res) => {
  const { email, password, displayname } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashedPass,
      displayname: displayname,
      comments: [],
      ratings: [],
    });

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Invalid Email or Password.");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid Email or Password");

  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({
    status: "Success",
    data: {
      user: {
        email: user.email,
        displayname: user.displayname,
        comments: user.comments,
        ratings: user.ratings,
      },
    },
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
