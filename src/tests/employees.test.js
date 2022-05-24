import request from 'supertest';
import employees from '../models/Employees';
import employeesSeed from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('POST TEST', () => {
  test('Should create new employee', async () => {
    const createNewEmployee = await request(app).post('/employees/').send({
      first_name: 'Laura',
      last_name: 'Brussa',
      phone: '1234567',
      email: 'laura@brussa.com',
      password: 'testeo123',
      active: true,
    });
    expect(createNewEmployee.statusCode).toBe(201);
    expect(createNewEmployee.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = createNewEmployee.body.data._id;
  });

  test('Should show me an error 400', async () => {
    const createEmployeefail = await request(app).post('/employees/').send({
      first_name: 'Laura',
      email: 'laura@brussa.com',
      password: 'testeo123',
      active: true,
    });
    expect(createEmployeefail.statusCode).toBe(400);
    expect(createEmployeefail.body.error).toBe(true);
  });
});

describe('GET TEST', () => {
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
    expect(getOneEmployee.body.msg).toBe('Employee successfully shown');
  });
});

describe('PUT TEST', () => {
  test('Should update an employee', async () => {
    const updateEmployee = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Laura',
      last_name: 'Fernandez',
      phone: '1234567',
      email: 'laura@brussa.com',
      password: 'testeo123',
      active: true,
    });
    expect(updateEmployee.statusCode).toBe(200);
    expect(updateEmployee.body.msg).toBe('Employee updated');
    expect(updateEmployee.body.error).toBe(false);
  });

  test('Should show me an error 400', async () => {
    const updateError = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Laura',
      phone: '1234567',
      email: 'laura@brussa.com',
      active: true,
    });
    expect(updateError.statusCode).toBe(400);
    expect(updateError.body.msg).toBe('Missing Parameter');
    expect(updateError.body.error).toBe(true);
  });
});

describe('DELETE TEST', () => {
  test('Should delete an employee', async () => {
    const employeeDelete = await request(app).delete(`/employees/${employeeId}`);
    expect(employeeDelete.statusCode).toBe(204);
    expect(employeeDelete.error).toBeFalsy();
  });
});
