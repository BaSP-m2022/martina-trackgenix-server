import { Router } from 'express';
import { writeFile } from 'fs';
import employees, { find, filter, push } from '../data/employees.json';

const employeesRouter = Router();

employeesRouter.get('/', (req, res) => {
  res.send(employees);
});

employeesRouter.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = find((employeeElement) => employeeElement.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('User not found');
  }
});

// Filters

employeesRouter.get('/', (req, res) => {
  const employeeStatus = req.query.active;
  const filterStatus = filter((emp) => JSON.stringify(emp.active) === employeeStatus);
  if (filterStatus.length > 0) {
    res.send(filterStatus);
  } else {
    res.send(`There are no ${employeeStatus}`);
  }
});

employeesRouter.get('/first_name/:first_name', (req, res) => {
  const employeeName = req.params.first_name;
  const filterName = filter((fName) => fName.first_name === employeeName);
  if (filterName.length > 0) {
    res.send(filterName);
  } else {
    res.send(`No exist ${employeeName}`);
  }
});

employeesRouter.get('/last_name/:last_name', (req, res) => {
  const employeeLastName = req.params.last_name;
  const filterLastName = filter((lName) => lName.last_name === employeeLastName);
  if (filterLastName.length > 0) {
    res.send(filterLastName);
  } else {
    res.send(`No exist ${employeeLastName}`);
  }
});

employeesRouter.post('/add', (req, res) => {
  const employeeData = req.body;
  push(employeeData);
  writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('New user created');
    }
  });
});

employeesRouter.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const filterEmployees = filter((employee) => employee.id === employeeId);
  if (!filterEmployees) {
    res.send('User does not exist, impossible to delete.');
  } else {
    writeFile('src/data/employees.json', JSON.stringify(filterEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User removed');
      }
    });
  }
});

export default employeesRouter;
