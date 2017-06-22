const { Users, Comments, Topics, Articles } = require("../models/models");
const { map } = require('async')
exports.getAllTopics = (req, res) => {
  Topics.find({}, (err, topics) => {
    if (err) return res.status(500).send("balls");
    res.status(200).json({ topics: topics });
  });
};

exports.getArticlesByTopic = (req, res) => {
  const topic = req.params.topic_title;
  Articles.find({belongs_to: topic}, (err, articles) => {
    if (err) return res.status(500).json(err);
    res.json(articles);
  });
};

/*
exports.getArticlesByTopic = (req, res) => {
  const url = req.url.split("/");
  const title = url[3];
  Articles.find("articles", function (err, data) {
    if (err) return res.status(500).send("Boo hoo get tae fuck!");
    const articles = data.filter(article => {
      if (article.belongs_to === title.toLowerCase())
        return {
          topic: article.belongs_to,
          body: article.body,
          votes: article.votes,
          created_by: article.created_by
        };
    });
    res.status(200).json({ topic: articles });
  });
};
*/
exports.getAllArticles = (req, res) => {
  Articles.find({}, (err, articles) => {
    if (err) return res.status(500).send("balls");
    res.status(200).json({ articles: articles });
  });
};

exports.getAllCommentsForArticle = (req, res) => {
  const id = req.params.article_id;
  Comments.find({belongs_to: id}, (err, comments) => {
    if (err) return res.status(500).json(err);
    res.json(comments);
  });
};
