import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidation from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksController.getAllTasks)
  .get('/:id', tasksController.getTaskById)
  .put('/:id', tasksValidation, tasksController.updateTask)
  .post('/', tasksValidation, tasksController.createNewTask)
  .delete('/:id', tasksController.deleteTask);

export default router;
