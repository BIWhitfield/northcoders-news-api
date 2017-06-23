if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
const {
  getAllTopics, 
  getArticlesByTopic, 
  getAllArticles, 
  getAllCommentsForArticle, 
  postNewCommentToArticle,
  getUserProfile,
  putVoteCount,
  putCommentVoteCount
} = require('./controllers/controllers');

mongoose.connect(db, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.status(200).send('All good!');
});

app.get('/api/topics', getAllTopics);
app.get('/api/topics/:topic_title/articles', getArticlesByTopic);
app.get('/api/articles',getAllArticles);
app.get('/api/articles/:article_id/comments',getAllCommentsForArticle);
app.get('/api/users/:username', getUserProfile)

app.post('/api/articles/:article_id/comments', postNewCommentToArticle);

app.put('/api/articles/:article_id',putVoteCount);
app.put('/api/comments/:comment_id',putCommentVoteCount);

app.use('/api', function () {});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
