const { Rating, Movie, User } = require("../models.js");

exports.createRating = async (req, res) => {
  try {
    const newRating = await Rating.create(req.body);
    const movie = await Movie.findOne({ movieid: req.body.movieid });
    const user = await User.findOne({ displayname: req.body.displayname });
    user.ratings.push(newRating);
    user.save();
    movie.ratings.push(newRating.rating);
    movie.save();

    res.status(201).json({
      status: "Success",
      data: {
        user: newRating,
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

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      displayname: req.params.displayname,
    });
    res.status(201).json({
      status: "Success",
      results: ratings.length,
      data: {
        ratings,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.editRating = (req, res) => {
  try {
    Rating.findByIdAndUpdate(req.params.id, req.body.update, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.status(201).json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
