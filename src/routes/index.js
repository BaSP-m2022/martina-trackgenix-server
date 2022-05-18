import express from 'express';
import superAdminRoutes from './super-admins';
import timeSheetRoutes from './time-sheets';
import taskRoutes from './tasks';
import adminRoutes from './admins';
import projectRoutes from './projects';

const router = express.Router();

router
  .use('/projects', projectRoutes)
  .use('/time-sheet', timeSheetRoutes)
  .use('/tasks', taskRoutes)
  .use('/admins', adminRoutes)
  .use('/super-admins', superAdminRoutes);

export default router;
