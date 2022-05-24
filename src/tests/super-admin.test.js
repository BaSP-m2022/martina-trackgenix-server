import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdmSeed from '../seeds/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdmSeed);
});

let superAdmId;

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
    // eslint-disable-next-line no-underscore-dangle
    superAdmId = response.body.data._id;
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

describe('GET BY ID /:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/super-admins/${superAdmId}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get(`/super-admins/${superAdmId}`).send();
    expect(response.error).toBe(false);
  });

  test('response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('PUT /:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).put(`/super-admins/${superAdmId}`).send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(201);
  });

  test('message should indicate the update of the super admin', async () => {
    const response = await request(app).put(`/super-admins/${superAdmId}`).send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.body.message).toBe('Super Admin Updated');
  });

  test('should not update the super admin when one field was not completed', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: '',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('password field should be valid', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 12345678933,
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('email field should be valid', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Lautaro',
      lastName: 'Acosta',
      email: 'lautaroeacosta23gmailcom',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('update super admin has an error', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
  });
});

describe('DELETE /:id', () => {
  test('should delete a super admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdmId}`).send();
    expect(response.status).toBe(204);
  });
});
