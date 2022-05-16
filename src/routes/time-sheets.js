import express from 'express';
import timeSheetController from '../controllers/time-sheets';
import timeSheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllTimeSheets)
  .get('/:id', timeSheetController.getTimeSheetById)
  .get('/Project', timeSheetController.getTimeSheetProject)
  .post('/', timeSheetValidation.validateNewTimesheet, timeSheetController.createNewTimeSheet)
  .put('/:id', timeSheetValidation.validateUpdateTimesheet, timeSheetController.updateTimeSheet)
  .delete('/:id', timeSheetController.deleteTimeSheeet);

export default router;
