import express from 'express';
import authController from '../controllers/auth';
import employeesValidation from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.verifyToken, authController.getAuth)
  .post('/register', employeesValidation, authController.register);

export default router;
