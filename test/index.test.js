// /* eslint-disable jest/expect-expect */

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
  test('Route /cohorts status 200, json header, data.id = data.id', (done) => {
    return request(app)
      .get('/api/v1/cohorts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data.id).toBe(data.id);
        done();
      });
  });
});
