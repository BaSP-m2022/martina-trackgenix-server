import request from 'supertest';
import timeSheet from '../models/Time-sheets';
import timeSheetSeeds from '../seeds/time-sheets';
import app from '../app';

beforeAll(async () => {
  await timeSheet.collection.insertMany(timeSheetSeeds);
});

let timeSheetId;

describe('Timesheet POST', () => {
  test('Create a timesheet', async () => {
    const response = await request(app).post('/time-sheet').send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 5,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    timeSheetId = response.body.data._id;
  });

  test('Message should indicate a creation a time-sheet', async () => {
    const response = await request(app).post('/time-sheet').send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 5,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('Time sheet created');
  });

  test('Should not created a time-sheet', async () => {
    const response = await request(app).post('/time-sheet').send();
    expect(response.status).toBe(400);
  });

  test('ERROR status: 400 (Empty Body)', async () => {
    const response = await request(app).post('/time-sheet').send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('ERROR status: 400 (Wrong Key)', async () => {
    const response = await request(app).post('/time-sheet').send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: '5',
      timesheetDate: '02-05-2022-T00:00:00.000+00:00',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('ERROR status: 400 (Missing a field)', async () => {
    const response = await request(app).post('/time-sheet').send({
      employee: '',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 5,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('Timesheet GET By ID', () => {
  test('status: 200', async () => {
    const response = await request(app).get(`/time-sheet/${timeSheetId}`).send();
    expect(response.body.message).toBe('Here is the time sheet you are looking for:');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('ERROR status: 400', async () => {
    const response = await request(app).get('/time-sheet/4').send();
    expect(response.body.message).toBe('An error ocurred');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('ERROR status: 404', async () => {
    const response = await request(app).get('/time-sheet/628b9d84b619836ba1d215ea').send();
    expect(response.body.message).toBe('Time sheet id not found');
    expect(response.statusCode).toBe(404);
  });

  test('It should get the TimeSheet list', async () => {
    const response = await request(app).get('/time-sheet');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Here is all the list');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });

  test('It should get an any array of two objects', async () => {
    const response = await request(app).get('/time-sheet?hs_worked=13');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Here is all the list');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });

  test('It should get an any array of one objects', async () => {
    const response = await request(app).get('/time-sheet?hs_worked=6');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Here is all the list');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});

describe('PUT/timeSheet/:id', () => {
  test('Time-sheet should be updated', async () => {
    const response = await request(app).put(`/time-sheet/${timeSheetId}`).send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 3,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.status).toBe(200);
  });

  test('Message should indicate a updated a time-sheet', async () => {
    const response = await request(app).put(`/time-sheet/${timeSheetId}`).send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 5,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('Time sheet updated');
  });

  test('ERROR status: 400 (Empty Body)', async () => {
    const response = await request(app).put(`/time-sheet/${timeSheetId}`).send();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('ERROR status: 400 (Wrong Key)', async () => {
    const response = await request(app).put(`/time-sheet/${timeSheetId}`).send({
      employee: '628407263debaf079ad1eab6',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: '5',
      timesheetDate: '02-05-2022-T00:00:00.000+00:00',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('ERROR status: 400 (Missing a field)', async () => {
    const response = await request(app).put(`/time-sheet/${timeSheetId}`).send({
      employee: '',
      project: '6283baefcd44998f831522aa',
      task: '62815f70585ba1dd80f096d9',
      hs_worked: 5,
      timesheetDate: '2022-05-02T00:00:00.000+00:00',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('DELETE/timeSheet/:id', () => {
  test('Should delete', async () => {
    const response = await request(app).delete(`/time-sheet/${timeSheetId}`).send();
    expect(response.statusCode).toBe(204);
  });

  test('It should return status 404 when id is invalid', async () => {
    const response = await request(app).delete('/time-sheet/628b9ce3b619836ba1d215e4').send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Time sheet not found');
    expect(response.body.error).toBe(true);
  });
});
