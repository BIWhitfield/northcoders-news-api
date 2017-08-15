# Northcoders News API

Northcoders News API is a RESTful api which has been created using Node.js, Express.js, MongoDB and Mongoose.

This repo contains all the code for the backend of the project. The front end repo can be found <a href="https://github.com/BIWhitfield/northcoders-news">here</a>.

## Getting Started

The API and all of its endpoints have been fully tested. If you would like to run the tests please ensure you have Node v8.0.0 or higher installed. You can check this by entering the following command into your terminal:

node -v

If you do not have the correct version of node click <a href="https://nodejs.org/en/">here</a> to install the latest version.

Then please ensure you have mongo installed, a guide can be found <a href="https://docs.mongodb.com/manual/installation/">here</a>

To now run the tests please clone the project, cd into the repo and install the dependencies:

`git clone https://github.com/BIWhitfield/northcoders-news-api.git`

`cd northcoders-news-api`

`npm install`

Once all dependencies have been installed, open a second shell in your terminal. In this run mongodb by entering the following command:

`mongod`

Now you can run the tests in your original shell by entering:

`npm test`


# Built With

* Express
* MongoDB
* Mongoose
* Mocha
* Chai



# Routes

| Route |   |
| ------|---|
| `GET /api/topics` | Get all the topics |
| `GET /api/topics/:topic_id/articles` | Return all the articles for a certain topic |
| `GET /api/articles` | Returns all the articles |
| `GET /api/articles/:article_id/comments` | Get all the comments for a individual article |
| `POST /api/articles/:article_id/comments` | Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"} |
| `PUT /api/articles/:article_id` | Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' e.g: /api/articles/:article_id?vote=up |
| `PUT /api/comments/:comment_id` | Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' e.g: /api/comments/:comment_id?vote=down |
| `DELETE /api/comments/:comment_id` | Deletes a comment |
| `GET /api/users/:username` | Returns a JSON object with the profile data for the specified user. |
