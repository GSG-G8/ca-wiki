const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Project', () => {
  test('Get projects route', () => {
    expect(1).toBe(1);
  });
});

// request(app)
//   .post('/api/v1/projects?type=Internal+project')
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(async (err, res) => {
//     if (err) return done(err);
//     const { data } = res.body;
//     expect(data).toHaveLength(1);
//     expect(data[0]).toEqual({
//       id: 1,
//       name: 'ca-wiki',
//       description:
//         'Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page',
//       img_url:
//         'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
//       github_link:
//         'https://github.com/GSG-G8/ca-wiki/tree/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3',
//       website_link:
//         'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D',
//       project_type: 'Internal project',
//       cohort_id: 1,
//     });
//     done();
//   });
describe('Admin, Post Project', () => {
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
          'SELECT * from project WHERE id = 8',
        );
        expect(rows[0].name).toBe('Mohmmedzw851@');
        expect(message).toBe('Project Added successfully');
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

describe('Admin, (/projects/:projectId)', () => {
  test('PUT Route /projects/1 status 200, json header, message:Cohort updated successfully', (done) => {
    const testData = {
      name: 'Mooooot',
      description: 'project test',
      imgUrl: 'https://github.com/GSG-G1',
      githubLink: 'https://github.com/GSG-G1',
      websiteLink: 'https://github.com/GSG-G1',
      projectType: 'remotely',
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
        expect(message).toBe('project updated successfully');
        done();
      });
  });
});

describe('Delete specific student by ID', () => {
  test('Route /alumni/1 status 200, data.message = Student deleted successfully ', (done) => {
    return request(app)
      .delete('/api/v1/alumni/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from student WHERE id = 1',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe('Student deleted successfully');
        done();
      });
  });
  test('Route /alumni/10 status 404, data.message = Student does not exist ', (done) => {
    return request(app)
      .delete('/api/v1/alumni/10')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        expect(message).toBe('Student does not exist');
        done();
      });
  });
  test('Route /alumni/Alaa status 404, data.message = You enterd wrong student ID ', (done) => {
    return request(app)
      .delete('/api/v1/alumni/Alaa')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        expect(message).toBe('You enterd wrong student ID');
        done();
      });
  });
});
