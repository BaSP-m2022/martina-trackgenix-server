import express from 'express';
import timeSheetController from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', timeSheetController.getAllTimeSheets);

export default router;
