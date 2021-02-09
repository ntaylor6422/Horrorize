const { Comment, Movie } = require("../models.js");

exports.createComment = async (req, res) => {
  try {
    const token = req.decoded;
    console.log(token);
    const movie = await Movie.findOne({ movieid: req.params.id });
    const newComment = await Comment.create(req.body);
    movie.comments.push(newComment);
    // const user = await User.findById();
    // user.comments.push(newComment);
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
