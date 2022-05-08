const express = require('express');
// const res = require('express/lib/response');

const router = express.Router();
const employees = require('../data/employees.json');

router.get('/getAll', (req, res) => {
  res.send(employees);
});

module.exports = router;
