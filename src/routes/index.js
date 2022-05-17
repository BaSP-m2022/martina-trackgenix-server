import express from 'express';
import employeeRoutes from './employees';
import adminRoutes from './admins';

const router = express.Router();

router.use('/employees', employeeRoutes);

router.use('/admins', adminRoutes);

export default router;
