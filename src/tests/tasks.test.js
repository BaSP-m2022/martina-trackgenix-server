import request from 'supertest';
import task from '../models/Tasks';
import tasksSeed from '../seeds/tasks';
import app from '../app';

beforeAll(async () => {
  await task.collection.insertMany(tasksSeed);
});

let taskId;
const mockReqBody = { description: 'convallis nulla neque libero convallis eget eleifend' };

describe('POST method tests', () => {
  test('Should not create a new Task / Error 400 / Empty body', async () => {
    const response = await request(app).post('/tasks/').send({});
    expect(response.status).toBe(400);
    // expect(response.body.message).toBe('Invalid input. Please check it.');
    expect(response.body.error).toBe(true);
  });

  test('Should create a new Task', async () => {
    const response = await request(app).post('/tasks/').send(mockReqBody);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('task created');
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    taskId = response.body.data._id;
  });
});

describe('GET method tests', () => {
  test('Should return the tasks list', async () => {
    const response = await request(app).get('/tasks/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tasks found');
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Should not return the tasks list / Error 404 / Wrong path', async () => {
    const response = await request(app).get('/task');
    expect(response.status).toBe(404);
  });

  test('Should return a Task by id', async () => {
    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task found');
    expect(response.body.error).toBe(false);
  });
});

describe('PUT method tests', () => {
  test('Should return an updated Task', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send({
      description: 'new description',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('task has been updated');
    expect(response.body.error).toEqual(false);
    expect(response.body.data.description).not.toBe('');
  });

  test('Should not return an updated Task / Error 400 / Empty body', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send({});
    expect(response.status).toBe(400);
    // expect(response.body.message).toBe('\"description\" is required');
    expect(response.body.error).toEqual(true);
  });
});

describe('DELETE method tests', () => {
  test('Should not delete a task / Wrong Id', async () => {
    const response = await request(app).delete('/tasks/62714f70585ba1dd80f096d9');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('task not found');
    expect(response.body.error).toEqual(true);
  });
  test('Should delete a Task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(204);
  });
});

describe('PUT method test', () => {
  test('Should not return an updated Task / wrong Id', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send({
      description: 'new description',
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('The task has not been found');
    expect(response.body.error).toEqual(true);
  });
});
