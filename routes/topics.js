const router = require('express').Router();
const {
  getAllTopics, 
  getArticlesByTopic
} = require('../controllers/controllers');

router.route('/')
    .get(getAllTopics);
router.route('/:topic_title/articles')
    .get(getArticlesByTopic);

module.exports = router;