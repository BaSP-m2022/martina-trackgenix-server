import request from 'supertest';
import Projects from '../models/Projects';
import projectSeed from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectSeed);
});
let projectId;
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

describe('Test POST /projects', () => {
  test('Project should be created', async () => {
    const response = await request(app).post('/projects').send({
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
    });

    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
});

describe('Test PUT /projects', () => {
  test('Project should be updated, error should be false and message equal to Project has been successfully updated', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
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
    });

    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toBe('Project has been successfully updated');
  });

  test('should not update an employee when body is empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send();
    expect(response.status).toBe(400);
  });

  test('project should not be updated when a field is missing', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
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
    });

    expect(response.status).toBe(400);
  });
});

describe('Test DELETE /projects', () => {
  test('should delete a project', async () => {
    const response = await request(app).delete(`/projects/${projectId}`).send();
    expect(response.status).toBe(204);
  });
});
