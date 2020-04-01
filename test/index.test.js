const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Cohort', () => {
  const data = {
    name: 'G6',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
    githubLink: 'https://github.com/GSG-G8',
  };
  const invalidData = {
    name: 'G5',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'img url',
    githubLink: 'github link',
  };
  test('POST Route /cohorts status 200, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 3',
        );
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 3,
          name: 'G6',
          description: 'GazaSkyGeeks Code Academy, 6th Cohort',
          img_url:
            'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
          github_link: 'https://github.com/GSG-G8',
        });
        expect(message).toBe(
          `Cohort with Key (name)=(${data.name}) added successfully`,
        );
        done();
      });
  });
  test('POST Route /cohorts status 409, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(data)
      .expect(409)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe(`Key (name)=(${data.name}) already exists.`);
        done();
      });
  });
  test('POST Route /cohorts status 400, json header, send invalid data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(rows).toHaveLength(0);
        expect(message).toEqual([
          'imgUrl must be a valid URL',
          'githubLink must be a valid URL',
        ]);
        done();
      });
  });
});

describe('Admin, Project', () => {
  test('Route /projects status 200, json header, data.message = Project Added successfully ', (done) => {
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
