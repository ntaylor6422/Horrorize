const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.createUser = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPass,
      displayname: req.body.displayname,
      comments: [],
      ratings: [],
    });

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
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  console.log("token:", token);
  res.cookie("token", token, { maxAge: process.env.ACCESS_TOKEN_LIFE * 1000 });
  res.end();
};
