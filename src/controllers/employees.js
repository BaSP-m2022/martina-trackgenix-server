import { Router } from 'express';
import fileSystem from 'fs';
import employees from '../data/employees.json';

const employeesRoutes = Router();

employeesRoutes.get('/', (req, res) => {
  res.send(employees);
});

employeesRoutes.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = employees.find((employeeElement) => employeeElement.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('User not found');
  }
});

employeesRoutes.get('/', (req, res) => {
  const employeeStatus = req.query.active;
  const filterStatus = employees.filter((emp) => JSON.stringify(emp.active) === employeeStatus);
  if (filterStatus.length > 0) {
    res.send(filterStatus);
  } else {
    res.send(`There are no ${employeeStatus}`);
  }
});

employeesRoutes.get('/first_name/:first_name', (req, res) => {
  const employeeName = req.params.first_name;
  const filterName = employees.filter((fName) => fName.first_name === employeeName);
  if (filterName.length > 0) {
    res.send(filterName);
  } else {
    res.send(`No exist ${employeeName}`);
  }
});

employeesRoutes.get('/last_name/:last_name', (req, res) => {
  const employeeLastName = req.params.last_name;
  const filterLastName = employees.filter((lName) => lName.last_name === employeeLastName);
  if (filterLastName.length > 0) {
    res.send(filterLastName);
  } else {
    res.send(`No exist ${employeeLastName}`);
  }
});

employeesRoutes.post('/add', (req, res) => {
  const employeeData = req.body;
  if (employeeData.id && employeeData.first_name
    && employeeData.last_name && employeeData.phone
     && employeeData.email && employeeData.password) {
    employees.push(employeeData);
    fileSystem.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`New user created ${JSON.stringify(employeeData)}`);
      }
    });
  } else {
    res.send('User data is incomplete');
  }
});

employeesRoutes.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const filterEmployees = employees.filter((employee) => employee.id === employeeId);
  if (!filterEmployees) {
    res.send('User does not exist, impossible to delete.');
  } else {
    fileSystem.writeFile('src/data/employees.json', JSON.stringify(filterEmployees), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User removed');
      }
    });
  }
});

employeesRoutes.put('/:id', (req, res) => {
  const emp1 = employees.some((employee) => employee.id === parseInt(req.params.id, 10));
  if (emp1) {
    const employeeData = req.body;
    employees.forEach((employee) => {
      const emp = employee;
      if (emp.id === parseInt(req.params.id, 10)) {
        emp.first_name = employeeData.first_name ? employeeData.first_name : emp.first_name;
        emp.last_name = employeeData.last_name ? employeeData.last_name : emp.last_name;
        emp.phone = employeeData.phone ? employeeData.phone : emp.phone;
        emp.email = employeeData.email ? employeeData.email : emp.email;
        emp.password = employeeData.password ? employeeData.password : emp.password;
        emp.active = employeeData.active === emp.active ? emp.active : employeeData.active;
        fileSystem.writeFile('src/data/employees.json', JSON.stringify(employee), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Your employee is edit ');
          }
        });
      }
    });
  } else {
    res.send(`No employee with the id ${req.params.id}`);
  }
});

export default employeesRoutes;
