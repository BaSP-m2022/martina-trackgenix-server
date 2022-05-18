import express from 'express';
import projectRoutes from './projects';
import adminRoutes from './admins';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/admins', adminRoutes);

export default router;
