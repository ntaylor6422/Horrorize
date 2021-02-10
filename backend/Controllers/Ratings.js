const { Rating, Movie } = require("../models.js");

exports.createRating = async (req, res) => {
  try {
    const newRating = await Rating.create(req.body);
    const movie = await Movie.findOne({ movieid: movieid });
    movie.ratings.push(newRating);
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
