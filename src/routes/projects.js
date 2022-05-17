import express from 'express';
import ProjectsController from '../controllers/projects';
import ProjectsValidation from '../validations/projects';

const router = express.Router();

router
  .put('/:id', ProjectsValidation, ProjectsController.upDateProject)
  .delete('/:id', ProjectsController.deleteProject);

export default router;
