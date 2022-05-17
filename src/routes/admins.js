import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminsValidation.validateNewAdmin, adminsController.createAdmin)
  .get('/', adminsController.getAllAdmins)
  .get('/getByName', adminsController.getAdminByName)
  .get('/getBySurname', adminsController.getAdminBySurname)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsValidation.validateUpdatedAdmin, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
