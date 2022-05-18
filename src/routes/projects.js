import express from 'express';
import ProjectsController from '../controllers/projects';
import ProjectsValidation from '../validations/projects';

const router = express.Router();

router
  .put('/:id', ProjectsValidation, ProjectsController.upDateProject)
  .delete('/:id', ProjectsController.deleteProject)
  .get('/', ProjectsController.getAllProjects)
  .post('/', ProjectsValidation, ProjectsController.createProject)
  .get('/:id', ProjectsController.getProjectById);

export default router;
