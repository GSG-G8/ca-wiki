const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Cohort', () => {
  const data = {
    name: 'G1',
    description: 'Code GazaSkyGeeksAcademy, 1st Cohort',
    imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
    githubLink: 'https://github.com/GSG-G1',
  };
  const wrongData = {
    name: 'G2',
    description: 'Code GazaSkyGeeksAcademy, 2nd Cohort',
    imgUrl: 'This is cohort Image',
    githubLink: 'https://github.com/GSG-G1',
  };

  test('PUT Route /cohorts/1 status 200, json header, send data ', (done) => {
    return request(app)
      .put('/api/v1/cohorts/1')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 1',
        );
        expect(message).toBe('Changed Succefully');
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 1,
          name: 'G1',
          description: 'Code GazaSkyGeeksAcademy, 1st Cohort',
          img_url:
            'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
          github_link: 'https://github.com/GSG-G1',
        });
        done();
      });
  });

  test('PUT Route /cohorts/4 status 404, json header, send data ', (done) => {
    return request(app)
      .put('/api/v1/cohorts/4')
      .send(data)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(message).toBe("Sorry There's no cohort for this id to change");
        expect(rows).toHaveLength(0);
        done();
      });
  });

  test('PUT Route /cohorts/1 status 400, json header, send wrong data and test the received message', (done) => {
    return request(app)
      .put('/api/v1/cohorts/1')
      .send(wrongData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        await connection.query('SELECT * from cohort WHERE id = 1');
        expect(message[0]).toBe('imgUrl must be a valid URL');
        done();
      });
  });
});
