const { Movie } = require("../models");

exports.getMovieByTitle = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      title: req.params.title,
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
