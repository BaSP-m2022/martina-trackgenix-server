import express from 'express';
import adminRoutes from './admins';
import timeSheetRoutes from './time-sheets';

const router = express.Router();

router
  .use('/admins', adminRoutes)
  .use('/time-sheet', timeSheetRoutes);

export default router;
