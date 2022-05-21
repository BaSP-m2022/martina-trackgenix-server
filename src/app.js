import express from 'express';

import superAdmins from './controllers/super-admins';
import superAdmValidations from './validations/employees';

const app = express();

app.use(express.json());

app.get('/', superAdmins.getAllSuperAdmin);
app.get('/:id', superAdmins.getSuperAdminById);
app.put('/:id', superAdmins.updateSuperAdmin);
app.post('/', superAdmins.createSuperAdmin, superAdmValidations);
app.delete('/:id', superAdmins.deleteSuperAdmin);

export default app;
