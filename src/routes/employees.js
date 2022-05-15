import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeesController.getAllEmployees);
router.get('/', employeesValidation.validateCreation, employeesController.createEmployee);
router.get('/:id', employeesController.getEmployeeById);
router.put('/:id', employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

export default router;
