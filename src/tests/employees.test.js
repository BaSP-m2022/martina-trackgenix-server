import request from 'supertest';
import employees from '../models/Employees';
import employeesSeed from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await employees.collection.insertMany(employeesSeed);
});

let employeeId;

const employeeComplete = {
  first_name: 'Laura',
  last_name: 'Brussa',
  phone: 1234567,
  email: 'laura@brussa.com',
  password: 'testeo123',
  active: true,
};

const employeeIncomplete = {
  first_name: 'Laura',
  email: 'laura@brussa.com',
  password: 'testeo123',
  active: true,
};

const employeeUpdate = {
  first_name: 'Laura',
  last_name: 'Fernandez',
  phone: 1234567,
  email: 'laura@brussa.com',
  password: 'testeo123',
  active: true,
};

describe.skip('POST TEST', () => {
  test('Should create new employee', async () => {
    const createNewEmployee = await request(app).post('/auth/register').send(employeeComplete);
    expect(createNewEmployee.statusCode).toBe(201);
    expect(createNewEmployee.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = createNewEmployee.body.data._id;
  });

  test('Should show an error message and status 400 if one required field is empty', async () => {
    const createEmployeeFail = await request(app).post('/auth/register').send(employeeIncomplete);
    expect(createEmployeeFail.statusCode).toBe(400);
    expect(createEmployeeFail.body.error).toBe(true);
  });
});

describe.skip('GET TEST', () => {
  test('Should show me all employees', async () => {
    const getAll = await request(app).get('/employees/');
    expect(getAll.statusCode).toBe(200);
    expect(getAll.body.error).toBe(false);
    expect(getAll.body.data.length).toBeGreaterThan(0);
  });

  test('Should show me only one employee by Id', async () => {
    const getOneEmployee = await request(app).get(`/employees/${employeeId}`);
    expect(getOneEmployee.statusCode).toBe(200);
    expect(getOneEmployee.body.error).toBe(false);
  });

  test('Should show me an error 404 ', async () => {
    const response = await request(app).get('/employees/628af2c4b6824cd901ba98a7');
    expect(response.statusCode).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Should show me an error 404 ', async () => {
    const response = await request(app).get('/employees/658hjgc4b6828hd901ba97g8');
    expect(response.statusCode).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe.skip('PUT TEST', () => {
  test('Should update an employee', async () => {
    const updateEmployee = await request(app).put(`/employees/${employeeId}`).send(employeeUpdate);
    expect(updateEmployee.statusCode).toBe(200);
    expect(updateEmployee.body.msg).toBe('Employee updated');
    expect(updateEmployee.body.error).toBe(false);
  });

  test('Should show me an error 400', async () => {
    const updateError = await request(app).put(`/employees/${employeeId}`).send(employeeIncomplete);
    expect(updateError.statusCode).toBe(400);
    expect(updateError.body.error).toBe(true);
  });
});

describe.skip('DELETE TEST', () => {
  test('Should delete an employee', async () => {
    const employeeDelete = await request(app).delete(`/employees/${employeeId}`);
    expect(employeeDelete.statusCode).toBe(204);
    expect(employeeDelete.error).toBeFalsy();
  });
});
