import express from 'express';
import projectsController from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .put('/:id', projectsValidation, projectsController.updateProject)
  .delete('/:id', projectsController.deleteProject)
  .get('/', projectsController.getAllProjects)
  .post('/', projectsValidation, projectsController.createProject)
  .get('/:id', projectsController.getProjectById);

export default router;
