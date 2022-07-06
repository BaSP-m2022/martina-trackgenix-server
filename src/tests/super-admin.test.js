import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdmSeed from '../seeds/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdmSeed);
});

let superAdmId;

const mockReqBody = {
  firstName: 'Lautaro',
  lastName: 'Acosta',
  email: 'lautaroeacosta23@gmail.com',
  password: 'test12345',
  active: true,
};

describe('POST', () => {
  test('should create an super admin, return error false and message super Admin created', async () => {
    const response = await request(app).post('/super-admins').send(mockReqBody);
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('super Admin created');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    superAdmId = response.body.data._id;
  });

  test('should not create an super admin if one required field is empty', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: '',
      lastName: 'Acosta',
      email: 'lautaroeacosta23@gmail.com',
      password: 'test12345',
      active: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should not create super admin if the body request is empty', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
  });
});

describe('GET and GET BY ID /:id and error: false', () => {
  test('response should return a 200 status and false error', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return a 200 status and false error', async () => {
    const response = await request(app).get(`/super-admins/${superAdmId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

const mockPutBody = {
  firstName: 'Juan',
  lastName: 'Acosta',
  email: 'lautaroeacosta23@gmail.com',
  active: true,
};

const incompleteBody = {
  firstName: '',
  lastName: 'Acosta',
  email: 'lautaroeacosta23@gmail.com',
  password: 'test12345',
  active: true,
};

const invalidPassword = {
  firstName: 'Juan',
  lastName: 'Acosta',
  email: 'lautaroeacosta23@gmail.com',
  password: 12345678933,
  active: true,
};

const invalidEmail = {
  firstName: 'Juan',
  lastName: 'Acosta',
  email: 'lautaroeacosta23gmailcom',
  password: 'test12345',
  active: true,
};

describe('PUT /:id', () => {
  test('message should indicate the update of the super admin and return 200 status', async () => {
    const response = await request(app).put(`/super-admins/${superAdmId}`).send(mockPutBody);
    expect(response.body.message).toBe('Super Admin Updated');
    expect(response.status).toBe(200);
  });

  test('should not update the super admin when one field was not completed', async () => {
    const response = await request(app).post('/super-admins').send(incompleteBody);
    expect(response.status).toBe(400);
  });

  test('password field should be valid', async () => {
    const response = await request(app).post('/super-admins').send(invalidPassword);
    expect(response.status).toBe(400);
  });

  test('email field should be valid', async () => {
    const response = await request(app).post('/super-admins').send(invalidEmail);
    expect(response.status).toBe(400);
  });

  test('update super admin has an error', async () => {
    const response = await request(app).post('/super-admins').send();
    expect(response.status).toBe(400);
  });

  test('response status 404 when super admin id is wrong', async () => {
    const response = await request(app).post('/super-admins/558578f0b38934591452aa2e').send(mockPutBody);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /:id', () => {
  test('should delete a super admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdmId}`).send();
    expect(response.status).toBe(204);
  });
});
