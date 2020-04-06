const request = require('supertest');
const connection = require('../server/database/connection');
const dbBuild = require('../server/database/data/build');

const app = require('../server/app');

const token =
  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2MDU0MjM1fQ.ANOdUJz-kWK-m9hdOc4Ee-NA4bx_VaRK-pxehp399G8';

beforeEach(() => dbBuild());
afterAll(() => connection.end());

describe('Alumni, Get all students', () => {
  test('Route /alumni status 200, json header, data[0].name = Alaa ', (done) => {
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

describe('Get student by id', () => {
  test('Route /alumni/1 status 200, json header, data.name = Alaa ', (done) => {
    return request(app)
      .get('/api/v1/alumni/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const {
          data: { name },
        } = res.body;
        expect(name).toBe('Alaa');
        done();
      });
  });

  test('Route /alumni/8 status 200, json header ', (done) => {
    return request(app)
      .get('/api/v1/alumni/8')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('There is no student for this id');
        done();
      });
  });

  test('Route /alumni/Alaa status 404, json header ', (done) => {
    return request(app)
      .get('/api/v1/alumni/Alaa')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Invalid id');
        done();
      });
  });
});

describe('Put Student By Id', () => {
  const validData = {
    name: 'Rehab',
    email: 'rehab@gmail.com',
    imgUrl: 'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
    githubLink: 'https://github.com/rehabas',
    cohortId: 1,
  };
  const invalidData = {
    name: 'Rehab',
    email: 'email',
    imgUrl: 'img url',
    githubLink: 'github link',
    cohortId: 1,
  };
  const duplicateData = {
    name: 'Rehab',
    email: 'rana@gmail.com',
    imgUrl: 'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
    githubLink: 'https://github.com/rehabas',
    cohortId: 1,
  };

  test('PUT Route /alumni/1 status 200, json header, put data ', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .set('Cookie', token)
      .send(validData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from student WHERE id = 1',
        );
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 1,
          name: 'Rehab',
          email: 'rehab@gmail.com',
          img_url:
            'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
          github_link: 'https://github.com/rehabas',
          cohort_id: 1,
        });
        expect(message).toBe("Student's data updated successfully");
        done();
      });
  });

  test('PUT Route /alumni/1 status 200, json header, put data with same email', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .set('Cookie', token)
      .send({
        name: 'sara',
        email: 'alaa@gmail.com',
        imgUrl: 'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
        githubLink: 'https://github.com/rehabas',
        cohortId: 1,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from student WHERE id = 1',
        );
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 1,
          name: 'sara',
          email: 'alaa@gmail.com',
          img_url:
            'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
          github_link: 'https://github.com/rehabas',
          cohort_id: 1,
        });
        expect(message).toBe("Student's data updated successfully");
        done();
      });
  });

  test('PUT Route /alumni/11 status 404, json header, put data ', (done) => {
    request(app)
      .put('/api/v1/alumni/11')
      .set('Cookie', token)
      .send(validData)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from student WHERE id = 11',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe('There is no student for this id');
        done();
      });
  });

  test('PUT Route /alumni/1 status 400, json header, put invalid data ', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .set('Cookie', token)
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        await connection.query('SELECT * from student WHERE id = 1');
        expect(message).toEqual([
          'email must be a valid email',
          'imgUrl must be a valid URL',
          'githubLink must be a valid URL',
        ]);
        done();
      });
  });

  test('PUT Route /alumni/1 status 409, json header, put data ', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .set('Cookie', token)
      .send(duplicateData)
      .expect(409)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        expect(message).toBe(
          `Key (email)=(${duplicateData.email}) already exists.`,
        );
        done();
      });
  });
});

describe('Delete specific student by ID', () => {
  test('Route /alumni/1 status 200, data.message = Student deleted successfully ', (done) => {
    return request(app)
      .delete('/api/v1/alumni/1')
      .set('Cookie', token)
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
      .set('Cookie', token)
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
      .set('Cookie', token)
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
