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
