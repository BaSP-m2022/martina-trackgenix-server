import express from 'express';
import projectsConstroller from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projectsConstroller.getAllProjects)
  .post('/', projectsValidation, projectsConstroller.createProject);

export default router;
