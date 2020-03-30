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

describe('Admin, (/cohorts/:cohortId)', () => {
  test('Route /cohorts/1 status 200, data.message = Cohort deleted successfully ', (done) => {
    return request(app)
      .delete('/api/v1/cohorts/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { data } = res.body;
        if (err) return done(err);
        const result = await connection.query(
          'SELECT * from cohort WHERE id = 1',
        );
        expect(result.rows).toHaveLength(0);
        expect(data.message).toBe('Cohort deleted successfully');
        done();
      });
  });
});
