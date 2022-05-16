import express from 'express';
import adminsController from '../controllers/admins';

const router = express.Router();

router.post('/', adminsController.createAdmin);
router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.put('/:id', adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

export default router;
