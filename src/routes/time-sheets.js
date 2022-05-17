import express from 'express';
import timeSheetController from '../controllers/time-sheets';
import timeSheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllTimeSheets)
  .get('/:id', timeSheetController.getTimeSheetById)
  .get('/get-timesheet-project/:project_id', timeSheetController.getTimeSheetProject)
  .get('/get-timesheet-date/:timesheetDate', timeSheetController.getTimeSheetDate)
  .post('/', timeSheetValidation, timeSheetController.createNewTimeSheet)
  .put('/:id', timeSheetValidation, timeSheetController.updateTimeSheet)
  .delete('/:id', timeSheetController.deleteTimeSheet);

export default router;
