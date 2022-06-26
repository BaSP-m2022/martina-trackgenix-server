import express from 'express';
import authController from '../controllers/auth';
import employeesValidation from '../validations/employees';

const router = express.Router();

router
  .get('/', authController.getAuth)
  .post('/register', employeesValidation, authController.register);

export default router;
