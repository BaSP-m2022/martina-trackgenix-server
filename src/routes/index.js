import express from 'express';
import timeSheetRoutes from './time-sheets';
import taskRoutes from './tasks';
import adminRoutes from './admins';

const router = express.Router();

router
  .use('/time-sheet', timeSheetRoutes)
  .use('/tasks', taskRoutes)
  .use('/admins', adminRoutes);

export default router;
