import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';
import authController from '../controllers/auth';

const router = express.Router();

router
  .post('/', adminsValidation, adminsController.createAdmin)
  .get('/', adminsController.getAllAdmins, authController.getAuth)
  .get('/getByName', adminsController.getAdminByName)
  .get('/getBySurname', adminsController.getAdminByLastName)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsValidation, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
