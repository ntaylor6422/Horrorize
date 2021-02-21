const { Comment, Movie, User } = require("../models.js");

exports.createComment = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ displayname: req.body.displayname });
    console.log(user);
    const movie = await Movie.findOne({ movieid: req.params.movieid });
    console.log(movie);
    const newComment = await Comment.create(req.body);
    user.comments.push(newComment);
    user.save();
    movie.comments.push(newComment);
    movie.save();
    res.status(201).json({
      status: "Success",
      data: {
        user: newComment,
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

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      displayname: req.params.displayname,
    });
    res.status(201).json({
      status: "Success",
      results: comments.length,
      data: {
        comments,
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

exports.getCommentsByMovieId = async (req, res) => {
  try {
    const comments = await Comment.findMany({ movieid: req.params.movieid });

    res.status(201).json({
      status: "Success",
      results: comments.length,
      data: {
        comments,
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

exports.editComments = (req, res) => {
  try {
    Comment.findByIdAndUpdate(req.params.id, req.body.update, (err, result) => {
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
