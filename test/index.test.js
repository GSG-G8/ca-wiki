const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeEach(() => dbBuild());

afterAll(() => connection.end());

describe('Get all Cohorts', () => {
  test('Route /cohorts status 200, json header, data', (done) => {
    return request(app)
      .get('/api/v1/cohorts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data).toHaveLength(2);
        done();
      });
  });
});

describe('Get Specific Cohort', () => {
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

describe('Get Specific Cohort Projects', () => {
  test('Route /cohorts/1/projects?type=internal status 200, json header, data.length=1', (done) => {
    return request(app)
      .get('/api/v1/cohorts/1/projects?type=internal')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data).toHaveLength(1);
        expect(data[0].name).toBe('ca-wiki');
        expect(data[0].project_type).toBe('Internal');
        done();
      });
  });

  test('Route /cohorts/1/projects?type=remotely status 200, json header, data.length=1', (done) => {
    return request(app)
      .get('/api/v1/cohorts/1/projects?type=remotely')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data).toHaveLength(1);
        expect(data[0].name).toBe('room-booker');
        expect(data[0].project_type).toBe('Remotely');
        done();
      });
  });

  test('Route /cohorts/10/projects?type=internal status 200, json header, data.message = "No Data" ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/10/projects?type=internal')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('No Data');
        done();
      });
  });

  test('Route /cohorts/G1/projects?type=internal status 404, json header, data.message = "You enterd wrong cohort ID" ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/G1/projects?type=internal')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('You enterd wrong cohort ID');
        done();
      });
  });
});

describe('Admin, Post Project', () => {
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
          'SELECT * from project WHERE id = 5',
        );
        expect(rows[0].name).toBe('Mohmmedzw851@');
        expect(message).toBe('Project Added successfully');
        done();
      });
  });
});

describe('Admin, Delete Specific Cohort', () => {
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
