import express from 'express';
import ProjectsController from '../controllers/projects';
import ProjectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', ProjectsController.getAllTimeSheets)
  .post('/', ProjectsValidation.validateNewTimesheet, ProjectsController.createNewTimeSheet);

export default router;
