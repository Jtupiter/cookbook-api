'use strict';

const co = require('co');
const supertest = require('co-supertest');
const assert = require('assert');
const testSetup = require('./lib/test-setup');

// Setup db here

let app = require('../index').app;
let server = require('../index').server;

function test() {
  return supertest(server);
}

function createTestUser() {
  let userIndex = Date.now();
  return {
    username: `testuser${userIndex}`,
    email: `testuser${userIndex}@test.com`,
    password: `testpass${userIndex}`
  };
}

describe('api', function() {
  after(function() {
    // Teardown db here
  });

  describe('v1', function() {
    describe('POST /user', function() {
      let testUser;

      before(function() {
        testUser = createTestUser();
      });

      it('should return 200 with created user', function* () {
        let res = yield test().post('/api/v1/user').send(testUser).expect(200).end();
      });

      it('should return 400 if invalid data is passed', function* () {
        let badTestUser = createTestUser();
        delete badTestUser.username;
        yield test().post('/api/v1/user').send(badTestUser).expect(400).end();
      });
    });

    describe('GET /user/:id', function() {
      let testUser;

      before(function* () {
        testUser = createTestUser();
        let res = yield test().post('/api/v1/user').send(testUser).end();
        testUser.id = res.body.id;
      });

      it('should return 200 with correct user', function* () {
        let res = yield test().get('/api/v1/user/' + testUser.id).expect(200).end();
        assert(res.body.username === testUser.username);
      });

      it('should return 404 if user does not exist', function* () {
        const BAD_UUID = '9cf8befd-dead-beef-b9fe-1bbca933e213';

        yield test().get('/api/v1/user/' + BAD_UUID).expect(404).end();
      });

      it('should return 400 if an invalid id is passed', function* () {
        const NOT_UUID = 'not_a_uuid';

        yield test().get('/api/v1/user/' + NOT_UUID).expect(400).end();
      });
    });
  });
});