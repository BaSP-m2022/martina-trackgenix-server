import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperAdmin)
  .post('/', superAdminValidations.validateCreation, superAdminControllers.createSuperAdmin)
  .get('/:id', superAdminControllers.getSuperAdminById)
  .put('/:id', superAdminValidations.validateUpdate, superAdminControllers.updateSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAdmin);

export default router;
