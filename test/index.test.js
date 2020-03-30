const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Admin, Cohorts', () => {
  test('Route /cohorts status 200, json header, data.message = Cohort added successfully', (done) => {
    const reqData = {
      cName: 'G6',
      cDescription: 'GazaSkyGeeks Code Academy, 6th Cohort',
      cImgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
      cGithub: 'https://github.com/GSG-G8',
    };
    return request(app)
      .post('/api/v1/cohorts')
      .send(reqData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { data } = res.body;
        if (err) return done(err);
        const result = await connection.query(
          'SELECT * from cohort WHERE id = 3',
        );
        expect(result.rows[0].name).toBe('G6');
        expect(data.message).toBe('Cohort added successfully');
        done();
      });
  });
});
