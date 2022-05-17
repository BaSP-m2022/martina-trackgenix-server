import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperAd)
  .post('/', superAdminValidations, superAdminControllers.createSuperAdmin)
  .get('/:id', superAdminControllers.getSuperAdById)
  .put('/:id', superAdminValidations, superAdminControllers.updSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAd);

export default router;
