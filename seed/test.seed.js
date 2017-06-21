const async = require('async');
const mongoose = require('mongoose');

const models = require('../models/models');

const topics = [
  new models.Topics({title: 'Football', slug: 'football'}),
  new models.Topics({title: 'Cooking', slug: 'cooking'}),
  new models.Topics({title: 'Cats', slug: 'cats'})
];

const articles = [
  new models.Articles({title: 'Cats are great', body: 'something', belongs_to: 'cats'}),
  new models.Articles({title: 'Football is fun', body: 'something', belongs_to: 'football'})
];

const user = new models.Users({
  username: 'northcoder',
  name: 'Awesome Northcoder',
  avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200'
});

function saveUser (cb) {
  user.save(err => {
    if (err) cb(err);
    else cb();
  });
}

function saveTopics (cb) {
  models.Topics.create(topics, (err) => {
    if (err) cb(err);
    else cb();
  });
}

function saveArticles (cb) {
  models.Articles.create(articles, (err, docs) => {
    if (err) cb(err);
    else cb(null, docs);
  });
}

function saveComments (articlesArray, cb) {
  const articleId = articlesArray[0]._id;
  const comment = new models.Comments({body: 'this is a comment', belongs_to: articleId});
  const comment2 = new models.Comments({body: 'this is another comment', belongs_to: articleId, created_by: 'someone'});
  models.Comments.create([comment, comment2], err => {
    if (err) cb(err);
    else cb(null, {article_id: articleId, comment_id: comment._id, non_northcoder_comment: comment2._id });
  });
}

function saveTestData (DB, cb) {
  mongoose.connect(DB);
  mongoose.connection.dropDatabase();

  async.waterfall([saveUser, saveTopics, saveArticles, saveComments], (err, ids) => {
    if (err) console.log(err);
    else {
      console.log('Test data seeded successfully.');
      cb(null, ids);
    }
  });
}

module.exports = saveTestData;
