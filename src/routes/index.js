import express from 'express';
import projectRoutes from '../controllers/projects';

const router = express.Router();

router.use('/projects', projectRoutes);

export default router;
