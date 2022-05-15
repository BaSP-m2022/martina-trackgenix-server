import { Router } from 'express';
import fileSystem from 'fs';
import TimeSheet from '../models/Time-sheets';

const timeSheets = require('../data/time-sheets.json');

const timeSheetRouter = Router();
const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await TimeSheet.find({});
    res.status(200).json({ allTimeSheets });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error',
    });
  }
};

timeSheetRouter.get('/getById/:id', (req, res) => {
  const timesheetParamsId = parseInt(req.params.id, 10);
  const defTimeSheet = timeSheets.find((number) => number.timesheet_id === timesheetParamsId);
  if (defTimeSheet) {
    res.send(defTimeSheet);
  } else {
    res.send('TimeSheet ID not found');
  }
});

timeSheetRouter.get('/getProject', (req, res) => {
  const tryProjectId = parseInt(req.query.project_id, 10);
  const allProjectId = timeSheets.filter((number) => number.project_id === tryProjectId);
  if (allProjectId.length > 0) {
    res.json(allProjectId);
  } else {
    res.send(`No project with Id number of ${tryProjectId} found`);
  }
});

timeSheetRouter.get('/getEmployee', (req, res) => {
  const tryEmployeeId = parseInt(req.query.employee_id, 10);
  const allEmployeeId = timeSheets.filter((number) => number.employee_id === tryEmployeeId);
  if (allEmployeeId.length > 0) {
    res.json(allEmployeeId);
  } else {
    res.send(`No employee with Id number of ${tryEmployeeId} found`);
  }
});

const createNewTimeSheet = async (req, res) => {
  try {
    const newTimeSheet = new TimeSheet({
      employee_id: req.body.employee_id,
      project_id: req.body.project_id,
      task_description: req.body.task_description,
      hs_worked: req.body.hs_worked,
      timesheetDate: new Date(req.body.timesheetDate),
    });
    const success = await newTimeSheet.save();
    return res.status(201).json(success);
  } catch (error) {
    return res.json({
      msg: 'An error ocurred',
    });
  }
};

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
      fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
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
    const filteredTS = timeSheets.filter((number) => number.timesheet_id !== timesheetParamsId);
    fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTS), (err) => {
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

export default {
  getAllTimeSheets,
  createNewTimeSheet,
};
