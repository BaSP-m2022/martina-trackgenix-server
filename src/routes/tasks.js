import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidation from '../validations/tasks';

const router = express.Router();

router
  .post('/', tasksValidation.validateNewTask, tasksController.createNewTask);

export default router;
