import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperAdmin)
  .post('/', superAdminValidations, superAdminControllers.createSuperAdmin)
  .get('/:id', superAdminControllers.getSuperAdminById)
  .put('/:id', superAdminValidations, superAdminControllers.updateSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAdmin);

export default router;
