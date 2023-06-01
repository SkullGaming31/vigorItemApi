import request from 'supertest';

import { Trap } from '../src/api/traps';
import app from '../src/app';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏',
      }, done);
  });
});

it('responds with an array of traps', (done) => {
  request(app)
    .get('/api/v1/traps')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach((trap: Trap) => {
        expect(trap).toMatchObject({
          name: expect.any(String),
          description: expect.any(String),
          quality: expect.any(String),
          carry: expect.any(Number),
        });
      });
      done();
    });
});

describe('GET /api/v1/traps/:name', () => {
  it('responds with the details of a specific trap', (done) => {
    const trapName = 'Bear Trap';

    request(app)
      .get(`/api/v1/traps/${trapName.toLowerCase()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).toBe(trapName);
        expect(res.body.description).toBeDefined();
        expect(res.body.quality).toBeDefined();
        expect(res.body.carry).toBeDefined();
        done();
      });
  });

  it('responds with 404 if trap is not found', (done) => {
    const trapName = 'bug Trap';

    request(app)
      .get(`/api/v1/traps/${trapName.toLowerCase()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: '🔍 - Not Found' }, done);
  });
});