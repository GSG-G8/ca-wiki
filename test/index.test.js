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

describe('Cohort', () => {
  test('PUT Route /cohort/1 status 200, json header, send data ', (done) => {
    return request(app)
      .put('/api/v1/cohort/1')
      .send({
        name: 'G1',
        description: 'Code GazaSkyGeeksAcademy, 1st Cohort',
        img_url: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
        github_link: 'https://github.com/GSG-G1',
      })
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

  test('PUT Route /cohort/4 status 404, json header, send data ', (done) => {
    return request(app)
      .put('/api/v1/cohort/4')
      .send({
        name: 'G4',
        description: 'Code GazaSkyGeeksAcademy, 4th Cohort',
        img_url: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
        github_link: 'https://github.com/GSG-G4',
      })
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
});
