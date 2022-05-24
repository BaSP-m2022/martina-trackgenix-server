import request from 'supertest';
import Project from '../models/Projects';
import projectsSeed from '../seeds/projects';
import app from '../app';

const mockRequestBody = {
  project_name: 'The Little Prince',
  start_date: '1943-01-06T03:00:00.000Z',
  finish_date: '1943-04-06T03:00:00.000Z',
  client: 'Antoine de Saint-Exupéry',
  active: true,
  employees: [
    {
      role: 'DEV',
      rate: '10',
      id: '628578f0b38934591452aa2e',
    },
  ],
};

const mockRequestBodyIncomplete = {
  start_date: '1943-01-06T03:00:00.000Z',
  finish_date: '1943-04-06T03:00:00.000Z',
  client: 'Antoine de Saint-Exupéry',
  active: false,
  employees: [
    {
      role: 'DEV',
      rate: '10',
      id: '628578f0b38934591452aa2e',
    },
  ],
};

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeed);
});

let projectId;

describe('Test POST /projects', () => {
  test('Response should return a 201 status, error false, and message Project created', async () => {
    const response = await request(app).post('/projects').send(mockRequestBody);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual('Project created');
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });

  test('Project should NOT be created if the request is empty', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Response should return a 400 status, error true if at least one required field is empty', async () => {
    const response = await request(app).post('/projects').send(mockRequestBodyIncomplete);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

describe('Test GET /projects', () => {
  test('Response should return a 200 status, error false, and message Project found', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toEqual('Project found');
  });

  test('Response should return an array with at least one employee', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('Test GET /projects/:id', () => {
  test('Response should return a 200 status, error false, and message Project found', async () => {
    const response = await request(app).get(`/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toEqual('Project found');
  });

  test('Response should return a 404 status, error true, and message Project not found if the ID is inexistent', async () => {
    const response = await request(app).get('/projects/6283baefcd44998f831522bb').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toEqual('Project not found');
  });

  test('Response should return a 500 status, error true if the ID format is invalid', async () => {
    const response = await request(app).get('/projects/localhost:3000/projects/6283baefcd44998f831522bb3333333333').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
