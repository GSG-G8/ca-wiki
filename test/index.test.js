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
    const data = {
      name: 'Mohmmed',
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
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const { data: newData } = res.body;
        if (err) return done(err);
        expect(newData.message).toBe('Cohort Added successfully');
        done();
      });
  });
});

describe('Admin, cohorts', () => {
  test('Route /cohorts/1 status 200, json header, data.message = Cohort deleted successfully ', (done) => {
    return request(app)
      .delete('/api/v1/cohorts/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const { data } = res.body;
        if (err) return done(err);
        expect(data.message).toBe('Cohort deleted successfully');
        done();
      });
  });
});
