import express from 'express';
import timeSheetController from '../controllers/time-sheets';
import timeSheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllTimeSheets)
  .post('/', timeSheetValidation.validateNewTimesheet, timeSheetController.createNewTimeSheet);

export default router;
