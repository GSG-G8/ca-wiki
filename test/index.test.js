const request = require('supertest');
const connection = require('../server/database/config/connection');
const { dbBuild } = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => {
  return dbBuild();
});

afterAll(() => {
  return connection.end();
});

describe('Cohort', () => {
  test('Route /cohort/1 status 200, json header, res.body[0].name =G8 ', (done) => {
    request(app)
      .get('/api/v1/cohort/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body[0].name).toBe('G8');
        done();
      });
  });

  test('Route /cohort/2 status 200, json header, res.body[0].name =G7', async () => {
    const res = await request(app)
      .get('/api/v1/cohort/2')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body[0].name).toBe('G7');
  });
});
