import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdmSeed from '../seeds/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdmSeed);
});

describe('GET', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.error).toBe(false);
  });

  test('response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST', () => {
  test('should create an super admin', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(201);
    // superAdmId = response.body.data._id;
  });

  test('message should indicate the creation of the super admin', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.body.message).toEqual('super Admin created');
  });

  test('should not create an super admin when one field was not created', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: '',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('should not create super admin', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
  });
});

// describe('DELETE /:id', () => {
//     const response = await request(app).delete(`/super-admins/${superAdmId}`).send();
//     expect(response.status)
// })
