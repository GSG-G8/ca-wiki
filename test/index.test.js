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

describe('Admin, Project', () => {
  test('Route /projects status 200, json header, data.message = Cohort Added successfully ', (done) => {
    const reqData = {
      name: 'Mohmmedzw851@',
      description: 'description',
      imgUrl: 'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      githubLink: 'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      websiteLink:
        'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      projectType: 'internal',
      cohortId: '1',
    };
    return request(app)
      .post('/api/v1/projects')
      .send(reqData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { data } = res.body;
        if (err) return done(err);
        const result = await connection.query(
          'SELECT * from project WHERE id = 6',
        );
        expect(result.rows[0].name).toBe('Mohmmedzw851@');
        expect(data.message).toBe('Cohort Added successfully');
        done();
      });
  });
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

describe('Admin, (/projects/:projectId)', () => {
  test('PUT Route /projects/1 status 200, json header, message:Cohort updated successfully', (done) => {
    const testData = {
      name: 'Mooooot',
      description: 'project test',
      imgUrl: 'https://github.com/GSG-G1',
      githubLink: 'https://github.com/GSG-G1',
      websiteLink: 'https://github.com/GSG-G1',
      projectType: 'https://github.com/GSG-G1',
      cohortId: '2',
    };
    return request(app)
      .put('/api/v1/projects/5')
      .send(testData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body.data;
        const { rows } = await connection.query(
          'SELECT * from project WHERE id = 5',
        );
        expect(message).toBe('project updated successfully');
        expect(rows[0].name).toBe('Mooooot');
        done();
      });
  });
});
