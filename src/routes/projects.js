import express from 'express';
import projectsController from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projectsController.getAllProjects)
  .post('/', projectsValidation, projectsController.createProject);

export default router;
