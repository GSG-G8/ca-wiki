const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

test('Post cohort route', (done) => {
  request(app)
    .post('/api/v1/cohorts')
    .send({
      name: 'G6',
      description: 'GazaSkyGeeks Code Academy, 6th Cohort',
      imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
      githubLink: 'https://github.com/GSG-G8',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      const { message } = res.body.data;
      if (err) return done(err);
      const result = await connection.query(
        'SELECT * from cohort WHERE id = 3',
      );
      expect(result.rows[0].name).toBe('G6');
      expect(message).toBe('Cohort added successfully');
      done();
    });
});
