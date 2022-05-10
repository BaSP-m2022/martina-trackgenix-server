import { Router } from 'express';
import { writeFile } from 'fs';

const timeSheets = require('../data/time-sheets.json');

const timeSheetRouter = Router();

timeSheetRouter.get('/', (req, res) => {
  res.send(timeSheets);
});

timeSheetRouter.get('/:id', (req, res) => {
  const timesheetParamsId = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.find((number) => number.timesheet_id === timesheetParamsId);
  if (defTimeSheet) {
    res.send(defTimeSheet);
  } else {
    res.send('TimeSheet ID not found');
  }
});

timeSheetRouter.get('/', (req, res) => {
  const tryProjectId = req.query.project_id;
  const allProjectId = timeSheets.filter((number) => JSON.stringify(number.project_id)
    === tryProjectId);
  if (allProjectId.length > 0) {
    res.send(allProjectId);
  } else {
    res.send(`No project with Id number of ${tryProjectId} found`);
  }
});

timeSheetRouter.get('/', (req, res) => {
  const tryEmployeeId = req.query.employee_id;
  const allEmployeeId = timeSheets.filter((number) => JSON.stringify(number.employee_id)
    === tryEmployeeId);
  if (allEmployeeId.length > 0) {
    res.send(allEmployeeId);
  } else {
    res.send(`No employee with Id number of ${tryEmployeeId} found`);
  }
});

// eslint-disable-next-line consistent-return
timeSheetRouter.post('/', (req, res) => {
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

  timeSheetRouter.push(newTimeSheet);
  writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('TimeSheet created');
    }
  });
  res.json(timeSheets);
});

timeSheetRouter.put('/:id', (req, res) => {
  const timesheetParamsId = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.find((number) => number.timesheet_id === timesheetParamsId);
  if (defTimeSheet) {
    const updTimeSheet = req.body;
    timeSheets.forEach((number) => {
      if (number.timesheet_id === timesheetParamsId) {
        const timesheet = number;
        timesheet.timesheet_id = updTimeSheet.timesheet_id
          ? updTimeSheet.timesheet_id : number.timesheet_id;
        timesheet.employee_id = updTimeSheet.employee_id
          ? updTimeSheet.employee_id : number.employee_id;
        timesheet.project_id = updTimeSheet.project_id
          ? updTimeSheet.project_id : number.project_id;
        timesheet.task_description = updTimeSheet.task_description
          ? updTimeSheet.task_description : number.task_description;
        timesheet.hs_worked = updTimeSheet.hs_worked
          ? updTimeSheet.hs_worked : number.hs_worked;
        timesheet.date = updTimeSheet.date
          ? updTimeSheet.date : number.date;
        res.json({ msg: 'Timesheet updated', number });
      }
      writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('TimeSheet modified');
        }
      });
    });
  } else {
    res.send('TimeSheet ID not found');
  }
});

timeSheetRouter.delete('/:id', (req, res) => {
  const timesheetParamsId = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.some((number) => number.timesheet_id === timesheetParamsId);
  if (defTimeSheet) {
    res.json({
      msg: 'TimeSheet deleted',
      timeSheets: timeSheets.filter((number) => number.timesheet_id !== timesheetParamsId),
    });
    writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('TimeSheet deleted');
      }
    });
  } else {
    res.status(400).json({ msg: `There is no timesheet with the Id ${timesheetParamsId}` });
  }
});

export default timeSheetRouter;
