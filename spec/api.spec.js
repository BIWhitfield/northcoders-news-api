process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const request = require('supertest');
const server = require('../server');
const saveTestData = require('../seed/test.seed');
const config = require('../config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;

describe('API', function () {
  let usefulIds;
  beforeEach(done => {
    saveTestData(db, (err, savedData) => {
      if (err) {
        console.log(err);
        done(err);
      } else {
        usefulIds = savedData;
        console.log('Test data seeded.', usefulIds);
        done();
      }
    });
  });
  describe('GET /', function () {
    it('responds with status code 200', function (done) {
      request(server)
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            done();
          }
        });
    });
  });
});