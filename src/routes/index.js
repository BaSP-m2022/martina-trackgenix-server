import express from 'express';
import timeSheetRoutes from './time-sheets';

const router = express.Router();

router
  .use('/time-sheet', timeSheetRoutes);

export default router;
