import express from 'express';
import superAdControllers from '../controllers/super-admins';
import superAdValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdControllers.getAllSuperAdmins)
  .post('/', superAdValidations.validateCreation)
  .get('/id', superAdControllers)
  .put('/id', superAdValidations.validateCreation)
  .delete('/id', superAdControllers);

export default router;
