import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router.post('/', adminsValidation, adminsController.createAdmin);
router.get('/', adminsController.getAllAdmins);
router.get('/getByQuery', adminsController.getAdminByQuery);
router.get('/:id', adminsController.getAdminById);
router.put('/:id', adminsValidation, adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

export default router;
