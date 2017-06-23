const { Users, Comments, Topics, Articles } = require("../models/models");
const { map } = require("async");

exports.getAllTopics = (req, res) => {
  Topics.find({}, (err, topics) => {
    if (err) return res.status(500).send("balls");
    res.status(200).json({ topics: topics });
  });
};

exports.getArticlesByTopic = (req, res) => {
  const topic = req.params.topic_title;
  Articles.find({ belongs_to: topic }, (err, articles) => {
    if (err) return res.status(500).json(err);
    res.json(articles);
  });
};

exports.getAllArticles = (req, res) => {
  Articles.find({}, (err, articles) => {
    if (err) return res.status(500).send("balls");
    res.status(200).json({ articles: articles });
  });
};

exports.getAllCommentsForArticle = (req, res) => {
  const id = req.params.article_id;
  Comments.find({ belongs_to: id }, (err, comments) => {
    if (err) return res.status(500).json(err);
    res.json(comments);
  });
};

exports.postNewCommentToArticle = (req, res) => {
  const id = req.params.article_id;
  var comment = new Comments();
  comment.body = req.body.comment;
  comment.belongs_to = id;

  comment
    .save(function (err, comment) {
      if (err) console.log(err);
    })
    .then(res.send("Comment posted!"));
};

exports.getUserProfile = (req, res) => {
  const username = req.params.username;
  Users.findOne({ username: username }, (err, user) => {
    if (err) return res.status(500).json(err);
    res.json(user);
  });
};

exports.putVoteCount = (req, res) => {
  const query = req.query.vote;
  const id = req.params.article_id;
  let inc;
  if (query === 'up') inc = 1;
  if (query === 'down') inc = -1;

  Articles.findByIdAndUpdate(id, { $inc: { votes: inc } }, { new: true }, (err, article) => {
    if (err) return res.status(500).json(err);
    res.json({ message: article.votes });
  });
};

exports.putCommentVoteCount = (req, res) => {
  const query = req.query.vote;
  const id = req.params.comment_id;
  let inc;
  if (query === 'up') inc = 1;
  if (query === 'down') inc = -1;

  Comments.findByIdAndUpdate(id, { $inc: { votes: inc } }, { new: true }, (err, comment) => {
    if (err) return res.status(500).json(err);
    res.json({ message: comment.votes });
  });
};

exports.deleteComment = (req, res) => {
  const id = req.params.comment_id;
  Comments.findByIdAndRemove(id,(err) => {
    if (err) return res.status(500).json(err);
res.json({message: 'You\'ve deleted your comment. Prick'});
  });
}
