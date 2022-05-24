import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

let adminId;
const nonExistent = '0';

describe('/POST admins', () => {
  test('Expect return to be Http status 201, error false and msg that admin has been created', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Wilbert',
      lastName: 'Sustin',
      phone: '7526113300',
      email: 'wsustin3@exblog.jp',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.body.message).toEqual('Admin has been created');
    expect(response.status).toBe(201);
    expect(response.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('Should show a 400 status code, error true and msg that an error has ocurred', async () => {
    const response = await request(app).post('/admins').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('An error has ocurred');
    expect(response.error).toBe(true);
  });

  test('Should not create an admin when a field is missing', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Wilbert',
      lastName: 'Sustin',
      phone: '7526113300',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.status).toBe(400);
  });
});

describe('TEST for /GET', () => {
  test('all admins, should show 200 status code, false error, at least one admin, and a msg: Admins whole list', async () => {
    const response = await request(app).get('/admins').send();

    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toEqual('Admins whole list');
  });

  test('response should return 200 status code', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.error).toBe(false);
  });

  test('message should say Admin Found', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.message).toEqual('Admin Found');
  });

  test('if Admin was not found response should return 404', async () => {
    const response = await request(app).get(`/admins/${nonExistent}`).send();
    expect(response.error).toBe(404);
  });
});

describe('/PUT admins', () => {
  test('response should return 200 status code', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Wilbert',
      lastName: 'Sustin',
      phone: '7526113300',
      email: 'wsustin3@exblog.jp',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.status).toBe(200);
  });

  test('message should indicate that an admin has been updated', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Wilbert',
      lastName: 'Sustin',
      phone: '7526113300',
      email: 'wsustin3@exblog.jp',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.body.message).toEqual('Admin has been successfully updated');
  });
});

describe('DELETE admins', () => {
  test('should delete admin', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.status).toBe(204);
  });
});
