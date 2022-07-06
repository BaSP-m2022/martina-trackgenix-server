import express from 'express';
import projectsController from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .put('/:id', projectsValidation.validateUpdate, projectsController.updateProject)
  .delete('/:id', projectsController.deleteProject)
  .get('/', projectsController.getAllProjects)
  .post('/', projectsValidation.validateCreation, projectsController.createProject)
  .get('/:id', projectsController.getProjectById);

export default router;
