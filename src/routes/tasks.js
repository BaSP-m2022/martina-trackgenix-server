import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidation from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksController.getAllTasks)
  .get('/:id', tasksController.getTaskById)
  .put('/:id', tasksValidation.validateNewTask, tasksController.updateTask)
  .post('/', tasksValidation.validateNewTask, tasksController.createNewTask)
  .delete('/:id', tasksController.deleteTask);

export default router;
