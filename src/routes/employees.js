import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);
router.post('/', employeesValidation.validateCreation, employeesController.createEmployee);
router.put('/:id', employeesValidation.validateUpdate, employeesController.editEmployee);
router.delete('/:id', employeesController.deleteEmployee);

export default router;
