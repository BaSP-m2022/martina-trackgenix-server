const express = require('express');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timeSheets);
});

module.exports = router;
