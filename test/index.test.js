const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

const token =
  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2MDU0MjM1fQ.ANOdUJz-kWK-m9hdOc4Ee-NA4bx_VaRK-pxehp399G8';

beforeEach(() => dbBuild());
afterAll(() => connection.end());

describe('Get project by id', () => {
  test('Route /projects/1 status 200, json header, data.name = ca-wiki ', (done) => {
    return request(app)
      .get('/api/v1/projects/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const {
          data: { name },
        } = res.body;
        expect(name).toBe('ca-wiki');
        done();
      });
  });

  test('Route /projects/8 status 200, json header ', (done) => {
    return request(app)
      .get('/api/v1/projects/8')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('There is no project for this id');
        done();
      });
  });

  test('Route /projects/gg status 404, json header ', (done) => {
    return request(app)
      .get('/api/v1/projects/gg')
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

describe('Add Project', () => {
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
      .set('Cookie', token)
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

  test('Route /projects status 400, json header, data.message = array of errors ', (done) => {
    const missingData = {
      name: 'Mohmmedzw851@',
      description: 'description',
      imgUrl: 'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      githubLink: 'Github Link',
      websiteLink: 'Not Deployed',
      projectType: 'internal',
      cohortId: 'G8',
    };
    return request(app)
      .post('/api/v1/projects')
      .set('Cookie', token)
      .send(missingData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        expect(message).toEqual([
          'githubLink must be a valid URL',
          'websiteLink must be a valid URL',
          'cohortId must be a `number` type, but the final value was: `NaN` (cast from the value `"G8"`).',
        ]);
        done();
      });
  });
});

describe('Delete Project By Id', () => {
  test('Route /projects/1 status 200, data.message = Project deleted successfully ', (done) => {
    return request(app)
      .delete('/api/v1/projects/1')
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        expect(message).toBe('Project deleted successfully');
        done();
      });
  });

  test('Route /projects/10 status 404, data.message = Project does not exist ', (done) => {
    return request(app)
      .delete('/api/v1/projects/10')
      .set('Cookie', token)
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
      .set('Cookie', token)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        expect(message).toBe('You enterd wrong project ID');
        done();
      });
  });
});

describe('Put Project By Id', () => {
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
      .set('Cookie', token)
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

  test('PUT Route /projects/1 status 400, json header, message: array of errors', (done) => {
    const missingData = {
      name: 'Mooooot',
      description: 'project test',
      imgUrl: 'https://github.com/GSG-G1',
      githubLink: 'Github Link',
      websiteLink: 'Not Deployed',
      projectType: 'remotely',
      cohortId: 'G8',
    };
    return request(app)
      .put('/api/v1/projects/5')
      .set('Cookie', token)
      .send(missingData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body.data;
        expect(message).toEqual([
          'githubLink must be a valid URL',
          'websiteLink must be a valid URL',
          'cohortId must be a `number` type, but the final value was: `NaN` (cast from the value `"G8"`).',
        ]);
        done();
      });
  });
});

describe('alumni for cohort', () => {
  test('Route /cohorts/2/alumni status 200, json header, data.name =Alaa ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/2/alumni')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data[0].name).toBe('Rana');
        done();
      });
  });

  test('Route /cohorts/10/alumni status 200, json header ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/10/alumni')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data).toHaveLength(0);
        done();
      });
  });
  test('Route /cohorts/g/alumni status 404, json header, data.message = "cohort does not exists" ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/g/alumni')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('cohort does not exists');
        done();
      });
  });
});

describe('Get project by type', () => {
  test('Route /projects?type=internal status 200, json header, rows[0].name = Applicants System ', (done) => {
    return request(app)
      .get('/api/v1/projects?type=internal')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { name } = res.body.data[0];
        expect(name).toBe('Applicants System');
        done();
      });
  });

  test('Route /projects?type=g58g status 404, json header ', (done) => {
    return request(app)
      .get('/api/v1/projects?type=gg')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toEqual([
          'projectType must be one of the following values: internal, remotely',
        ]);
        done();
      });
  });
  test('Route /projects status 404, json header ', (done) => {
    return request(app)
      .get('/api/v1/projects')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Please enter valid type');
        done();
      });
  });
});

describe('Get stats', () => {
  test('Route /stats status 200, json header ', (done) => {
    return request(app)
      .get('/api/v1/stats')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data.cohortsCount).toBe('2');
        expect(data.projectsCount).toBe('7');
        expect(data.studentsCount).toBe('2');
        done();
      });
  });
});

describe('Admin, Post Student', () => {
  test('Route /alumni status 200, json header, data.message = Student Added successfully ', (done) => {
    const reqData = {
      name: 'Rehab',
      email: 'rehab@gmail.com',
      imgUrl:
        'https://qph.fs.quoracdn.net/main-qimg-cd9c38fe6f5362af532dcc42cf22a6b7',
      githubLink: 'https://github.com/rehabas',
      cohortId: '1',
    };
    return request(app)
      .post('/api/v1/alumni')
      .send(reqData)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from student WHERE id = 3',
        );
        expect(rows[0].name).toBe('Rehab');
        expect(message).toBe('Student Added successfully');
        done();
      });
  });
});

describe('Admin Login and protected routes', () => {
  test('Route /login status 200, data.message = logged in successfully ', (done) => {
    return request(app)
      .post('/api/v1/login')
      .send({ username: 'Muhammad', password: '123456' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe('logged in successfully');
        done();
      });
  });

  test('Route /login status 400, data.message = schema validation ', (done) => {
    return request(app)
      .post('/api/v1/login')
      .send({ username: 'Muh', password: '123' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toEqual([
          'username must be at least 5 characters',
          'password must be at least 4 characters',
        ]);
        done();
      });
  });

  test("Route /login status 400, data.message = user doesn't exist", (done) => {
    return request(app)
      .post('/api/v1/login')
      .send({ username: "Ala'a", password: '102030' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe("user doesn't exist");
        done();
      });
  });

  test('Route /login status 400, data.message = Password is incorrect', (done) => {
    return request(app)
      .post('/api/v1/login')
      .send({ username: 'Muhammad', password: '102030' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe('Password is incorrect');
        done();
      });
  });

  test('Delete /projects/1, logged out/ no cookie, status 401, data.message = Sign-in first ', (done) => {
    return request(app)
      .delete('/api/v1/projects/1')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe('Sign-in first');
        done();
      });
  });

  test('Delete /projects/1, wrong cookie token, status 401, data.message = Un-Authorized ', (done) => {
    return request(app)
      .delete('/api/v1/projects/1')
      .set('Cookie', 'token=wrongtoken')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(message).toBe('Un-Authorized');
        done();
      });
  });

  test('PUT Route /alumni/1, logged out/ no cookie, status 401, json header, error message = Sign-in first ', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .send({
        name: 'Rehab',
        email: 'rehab@gmail.com',
        imgUrl: 'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
        githubLink: 'https://github.com/rehabas',
        cohortId: 1,
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Sign-in first');
        done();
      });
  });

  test('PUT Route /alumni/1, wrong cookie, status 401, json header, error message = Un-Authorized ', (done) => {
    request(app)
      .put('/api/v1/alumni/1')
      .set('Cookie', 'token=wrongtoken')
      .send({
        name: 'Rehab',
        email: 'rehab@gmail.com',
        imgUrl: 'https://avatars3.githubusercontent.com/u/49806841?s=460&v=4',
        githubLink: 'https://github.com/rehabas',
        cohortId: 1,
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Un-Authorized');
        done();
      });
  });

  test('Delete /alumni/1, logged out/ no cookie, status 401, message = Sign-in first ', (done) => {
    return request(app)
      .delete('/api/v1/alumni/1')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Sign-in first');
        done();
      });
  });

  test('Delete /alumni/1, logged out/ no cookie, status 401, message = Un-Authorized', (done) => {
    return request(app)
      .delete('/api/v1/alumni/1')
      .set('Cookie', 'token=wrongtoken')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('Un-Authorized');
        done();
      });
  });
});

describe('logout', () => {
  test('Test logout status 200, message = logout successfully', (done) => {
    return request(app)
      .get('/api/v1/logout')
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body;
        if (err) return done(err);
        expect(res.headers['set-cookie']).toEqual([
          'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        ]);
        expect(message).toBe('logout successfully');
        done();
      });
  });
});
