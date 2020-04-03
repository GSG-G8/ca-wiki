const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Admin, Add cohort', () => {
  const validData = {
    name: 'G6',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
    githubLink: 'https://github.com/GSG-G8',
  };
  const invalidData = {
    name: 'G5',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'img url',
    githubLink: 'github link',
  };

  test('POST Route /cohorts status 201, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(validData)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 3',
        );
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 3,
          name: 'G6',
          description: 'GazaSkyGeeks Code Academy, 6th Cohort',
          img_url:
            'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
          github_link: 'https://github.com/GSG-G8',
        });
        expect(message).toBe(
          `Cohort with Key (name)=(${validData.name}) added successfully`,
        );
        done();
      });
  });

  test('POST Route /cohorts status 409, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(validData)
      .expect(409)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe(`Key (name)=(${validData.name}) already exists.`);
        done();
      });
  });

  test('POST Route /cohorts status 400, json header, send invalid data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(invalidData)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) return done(err);
        const {
          data: { message },
        } = res.body;
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(rows).toHaveLength(0);
        expect(message).toEqual([
          'imgUrl must be a valid URL',
          'githubLink must be a valid URL',
        ]);
        done();
      });
  });
});

describe('Get all Cohorts', () => {
  test('Route /cohorts status 200, json header, data', (done) => {
    return request(app)
      .get('/api/v1/cohorts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        expect(data).toHaveLength(3);
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
        expect(data).toHaveLength(2);
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
        expect(message).toBe(
          'Please check cohort ID you entered or project type',
        );
        done();
      });
  });

  test('Route /cohorts/1/projects?type=international status 404, json header, data.message = "You enterd wrong cohort ID" ', (done) => {
    return request(app)
      .get('/api/v1/cohorts/G1/projects?type=international')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        const { message } = res.body;
        expect(message).toBe(
          'Please check cohort ID you entered or project type',
        );
        done();
      });
  });
});

describe('Put Cohort', () => {
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

describe('Admin, (/cohorts/:cohortId)', () => {
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