const { Movie } = require("../models");

exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        user: newMovie,
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

exports.getMovieByTitle = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      movietitle: req.params.title,
    });
    res.status(201).json({
      data: {
        movie,
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
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      movieid: req.params.movieid,
    });
    res.status(201).json({
      data: {
        movie,
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
