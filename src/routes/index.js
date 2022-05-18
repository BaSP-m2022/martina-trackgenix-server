import express from 'express';
import taskRoutes from './tasks';
import adminRoutes from './admins';

const router = express.Router();

router
  .use('/tasks', taskRoutes)
  .use('/admins', adminRoutes);

export default router;
