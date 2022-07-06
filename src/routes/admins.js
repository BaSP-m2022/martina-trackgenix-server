import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminsValidation.validateCreate, adminsController.createAdmin)
  .get('/', adminsController.getAllAdmins)
  .get('/getByName', adminsController.getAdminByName)
  .get('/getBySurname', adminsController.getAdminByLastName)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsValidation.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
