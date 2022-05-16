import express from 'express';
import tasksController from '../controllers/tasks';
import tasksValidation from '../validations/tasks';

const router = express.Router();

router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.put('/id', tasksValidation.validateNewTask, tasksController.updateTask);
router.post('/', tasksValidation.validateNewTask, tasksController.createNewTask);
router.delete('/:id', tasksController.deleteTask);

export default router;
