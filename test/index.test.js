const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

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

describe('alumni', () => {
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

describe('alumni for cohort', () => {
  test('Route /alumni/cohorts/10 status 404, json header, data.message = "cohort does not exists" ', (done) => {
    return request(app)
      .get('/api/v1/alumni/cohorts/10')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe('cohort does not exists');
        done();
      });
  });
  test('Route /alumni/cohorts/g status 404, json header, data.message = "You enterd wrong cohort ID" ', (done) => {
    return request(app)
      .get('/api/v1/alumni/cohorts/g')
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
        expect(message).toBe('Please enter valid type');
        done();
      });
  });
});

describe('Admin, Put project', () => {
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

test('Route /alumni/cohorts/2 status 200, json header, data.name =Alaa ', (done) => {
  return request(app)
    .get('/api/v1/alumni/cohorts/2')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      if (err) return done(err);
      const { data } = res.body;
      expect(data[0].name).toBe('Rana');
      done();
    });
});
