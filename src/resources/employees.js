/* eslint-disable no-shadow */
const express = require('express');
// const res = require('express/lib/response');

const router = express.Router();
const employees = require('../data/employees.json');

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find((employee) => employee.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('User not found');
  }
});

// Filters

router.get('/', (req, res) => {
  const employeeStatus = req.query.active;
  const filterStatus = employees.filter((emp) => JSON.stringify(emp.active) === employeeStatus);
  if (filterStatus.length > 0) {
    res.send(filterStatus);
  } else {
    res.send(`There are no ${employeeStatus}`);
  }
});

router.get('/', (req, res) => {
  const employeeName = req.query.first_name;
  const filterName = employees.filter((fName) => fName.first_name === employeeName);
  if (filterName.length > 0) {
    res.send(filterName);
  } else {
    res.send(`There are no ${employeeName}`);
  }
});

router.get('/', (req, res) => {
  const employeeLastName = req.query.last_name;
  const filterLastName = employees.filter((lName) => lName.last_name === employeeLastName);
  if (filterLastName.length > 0) {
    res.send(filterLastName);
  } else {
    res.send(`There are no ${employeeLastName}`);
  }
});

module.exports = router;
