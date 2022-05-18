import express from 'express';
import timeSheetController from '../controllers/time-sheets';
import timeSheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllTimeSheets)
  .get('/:id', timeSheetController.getTimeSheetById)
  .get('/get-timesheet-project/:project_id', timeSheetController.getTimeSheetByProject)
  .get('/get-timesheet-date/:timesheetDate', timeSheetController.getTimeSheetByDate)
  .post('/', timeSheetValidation, timeSheetController.createNewTimeSheet)
  .put('/:id', timeSheetValidation, timeSheetController.updateTimeSheet)
  .delete('/:id', timeSheetController.deleteTimeSheet);

export default router;
