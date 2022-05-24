/* eslint-disable no-underscore-dangle */
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
      id: 12,
    },
  ],
  admin_id: '43',
};

const mockRequestBodyIncomplete = {
  project_name: 'The Little Prince',
  start_date: '1943-01-06T03:00:00.000Z',
  finish_date: '1943-04-06T03:00:00.000Z',
  client: 'Antoine de Saint-Exupéry',
  admin_id: '43',
};

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeed);
});

let projectId;

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
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toEqual('Project found');
  });
});

describe('Test POST /projects', () => {
  test('Response should return a 201 status, error false, and message Project created', async () => {
    const response = await request(app).post('/projects').send(mockRequestBody);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toEqual('Project created');
    projectId = response.body.data._id;
  });

  test('Project should NOT be created if the request is empty', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a 400 status, error true if at least one required field is empty', async () => {
    const response = await request(app).post('/projects').send(mockRequestBodyIncomplete);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
