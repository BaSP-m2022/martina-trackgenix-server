const express = require('express');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timeSheets);
});

router.get('/timeSheetId/:id', (req, res) => {
  const toTimeSheet = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.filter((number) => number.timesheet_id === toTimeSheet);
  if (defTimeSheet) {
    res.send(defTimeSheet);
  } else {
    res.send('TimeSheet ID not found');
  }
});

module.exports = router;
