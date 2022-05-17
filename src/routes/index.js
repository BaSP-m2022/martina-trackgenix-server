import express from 'express';
import superAdminRoutes from './super-admins';
import adminRoutes from './admins';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/admins', adminRoutes);

export default router;
