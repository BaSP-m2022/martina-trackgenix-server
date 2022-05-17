import express from 'express';
import timeSheetRoutes from './time-sheets';
import adminRoutes from './admins';

const router = express.Router();

router
  .use('/time-sheet', timeSheetRoutes)
  .use('/admins', adminRoutes);

export default router;
