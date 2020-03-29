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
  test('Route /cohort/1 status 200, json header, data.name =G8 ', (done) => {
    return request(app)
      .get('/api/v1/cohort/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const { data } = res.body;
        if (err) return done(err);
        expect(data.name).toBe('G8');
        done();
      });
  });
  test('Route /cohort/10 status 200, json header, data.message = "Sorry There\'s no cohort for this id" ', (done) => {
    return request(app)
      .get('/api/v1/cohort/10')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe("Sorry There's no cohort for this id");
        done();
      });
  });
});
