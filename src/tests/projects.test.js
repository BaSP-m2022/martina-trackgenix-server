import request from 'supertest';
import Project from '../models/Projects';
import projectsSeed from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeed);
});

describe('Test GET /projects', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
  test('Response should return error false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return at least one employee', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return message Project found', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.message).toBe('Project found');
  });
});
