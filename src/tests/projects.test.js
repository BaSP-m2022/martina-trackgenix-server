import request from 'supertest';
import Projects from '../models/Projects';
import projectSeed from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectSeed);
});

describe('GET', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
});
