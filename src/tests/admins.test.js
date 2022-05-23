import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('/GET admins', () => {
  test('response should return 200 status code', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBe(false);
  });

  test('response should be at least one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('/POST admins', () => {
  test('should create an admin', async () => {
    const response = await request(app).post('/admins').send({
      first_name: 'Wilbert',
      last_name: 'Sustin',
      phone: 7526113300,
      email: 'wsustin3@exblog.jp',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.status).toBe(201);
  });

  test('message should indicate the creation of an admin', async () => {
    const response = await request(app).post('/admins').send({
      first_name: 'Wilbert',
      last_name: 'Sustin',
      phone: 7526113300,
      email: 'wsustin3@exblog.jp',
      password: 'SuhSgIONhq',
      active: true,
    });

    expect(response.body.message).toEqual('Admin has been created');
  });

  test('Should not create an admin', async () => {
    const response = await request(app).post('/admins').send();
    expect(response.status).toBe(400);
  });
});
