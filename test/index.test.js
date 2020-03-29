/* eslint-disable jest/no-test-callback */
const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => {
  return dbBuild();
});

afterAll(() => {
  return connection.end();
});

describe('Cohort', () => {
  test('Route /cohort/1 status 200, json header, res.body[0].name =G8 ', (done) => {
    return request(app)
      .get('/api/v1/cohort/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.name).toBe('G8');
        return done();
      });
  });
});
