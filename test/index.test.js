const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Admin, Delete Specific Project', () => {
  test('Route /projects/1 status 200, data.message = Project deleted successfully', (done) => {
    return request(app)
      .delete('/api/v1/projects/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * FROM project WHERE id = 1',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe('Project deleted successfully');
        done();
      });
  });
});

test('Route /projects/10 status 404, data.message = Project does not exist ', (done) => {
  return request(app)
    .delete('/api/v1/projects/10')
    .expect(404)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      const { message } = res.body.data;
      if (err) return done(err);
      expect(message).toBe('Project does not exist');
      done();
    });
});

test('Route /projects/ca-wiki status 404, data.message = You enterd wrong project ID ', (done) => {
  return request(app)
    .delete('/api/v1/projects/ca-wiki')
    .expect(404)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      const { message } = res.body.data;
      if (err) return done(err);
      expect(message).toBe('You enterd wrong project ID');
      done();
    });
});
