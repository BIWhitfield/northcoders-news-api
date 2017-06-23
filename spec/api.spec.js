process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const server = require("../server");
const saveTestData = require("../seed/test.seed");
// const config = require("../config");
// const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const mongoose = require("mongoose");

describe("API", function() {
  let usefulData;
  beforeEach(done => {
    mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
        console.log(`Useful data: ${Object.keys(usefulData)}`);
        done();
      })
      .catch(done);
  });
  describe("GET /api/topics", () => {
    it("responds with topics", done => {
      request(server).get("/api/topics").end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.topics).to.be.an("array");
        expect(res.body.topics.length).to.equal(3);
        done();
      });
    });
  });
  describe("GET /api/topics/:topic_id/articles", () => {
    it("responds with articles in a certain topic", done => {
      request(server).get("/api/topics/football/articles").end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.articles[0].belongs_to).to.equal("football");
        done();
      });
    });
  });
  describe("GET /api/articles", () => {
    it("responds with all articles", done => {
      request(server).get("/api/articles").end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.articles).to.be.an("array");
        expect(res.body.articles.length).to.equal(2);
        done();
      });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    it("responds with all comments for a particular article", done => {
      request(server)
        .get(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    it("should post a comment to a particular article", done => {
      request(server)
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({ comment: "HELLO, IS IT ME YOU ARE LOOKING FOOOOR" })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.comment.body).to.equal('HELLO, IS IT ME YOU ARE LOOKING FOOOOR');
          done();
        });
    });
  });
});
