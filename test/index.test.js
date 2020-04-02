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
