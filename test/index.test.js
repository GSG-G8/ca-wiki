const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeEach(() => dbBuild());

afterAll(() => connection.end());

describe('Cohort', () => {
  test('Route /cohorts/1 status 200, json header, data.name =G8 ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data.name).toBe('G8');
        done();
      });
  });

  test('Route /cohorts/10 status 404, json header, data.message = "Sorry There\'s no cohort for this id" ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/10')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe("Sorry There's no cohort for this id");
        done();
      });
  });
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
      .expect(201)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from project WHERE id = 3',
        );
        expect(rows[0].name).toBe('Mohmmedzw851@');
        expect(message).toBe('Project Added successfully');
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
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 1',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe('Cohort deleted successfully');
        done();
      });
  });
});

describe('alumni', () => {
  test('Route /alumni status 200, json header, data.name =G8 ', (done) => {
    return request(app)
      .get('/api/v1/alumni')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data[0].name).toBe('Alaa');
        expect(data).toHaveLength(2);
        done();
      });
  });
});
