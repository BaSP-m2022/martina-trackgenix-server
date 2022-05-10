const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timeSheets);
});

router.get('/timeSheetId/:id', (req, res) => {
  const toTimeSheet = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.find((number) => number.timesheet_id === toTimeSheet);
  if (defTimeSheet) {
    res.send(defTimeSheet);
  } else {
    res.send('TimeSheet ID not found');
  }
});

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const newTimeSheet = {
    timesheet_id: req.body.timesheet_id,
    employee_id: req.body.employee_id,
    project_id: req.body.project_id,
    task_description: req.body.task_description,
    hs_worked: req.body.hs_worked,
    date: req.body.date,
  };
  if (!newTimeSheet.timesheet_id || !newTimeSheet.employee_id || !newTimeSheet.project_id
    || !newTimeSheet.task_description || !newTimeSheet.hs_worked || !newTimeSheet.date) {
    return res.status(400).json({ msg: 'Please complete every field needed' });
  }

  timeSheets.push(newTimeSheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('User created');
    }
  });
  res.json(timeSheets);
});

module.exports = router;

router.put('/modify/:id', (req, res) => {
  const toTimeSheet = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.find((number) => number.timesheet_id === toTimeSheet);
  if (defTimeSheet) {
    const updTimeSheet = req.body;
    timeSheets.forEach((number) => {
      if (number.timesheet_id === toTimeSheet) {
        // eslint-disable-next-line no-param-reassign
        number.timesheet_id = updTimeSheet.timesheet_id
          ? updTimeSheet.timesheet_id : number.timesheet_id;
        // eslint-disable-next-line no-param-reassign
        number.employee_id = updTimeSheet.employee_id
          ? updTimeSheet.employee_id : number.employee_id;
        // eslint-disable-next-line no-param-reassign
        number.project_id = updTimeSheet.project_id
          ? updTimeSheet.project_id : number.project_id;
        // eslint-disable-next-line no-param-reassign
        number.task_description = updTimeSheet.task_description
          ? updTimeSheet.task_description : number.task_description;
        // eslint-disable-next-line no-param-reassign
        number.hs_worked = updTimeSheet.hs_worked
          ? updTimeSheet.hs_worked : number.hs_worked;
        // eslint-disable-next-line no-param-reassign
        number.date = updTimeSheet.date
          ? updTimeSheet.date : number.date;
        res.json({ msg: 'Member updated', number });
      }
    });
  } else {
    res.send('TimeSheet ID not found');
  }
});
