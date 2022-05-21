import express from 'express';
import superAdmins from './controllers/super-admins';
import superAdmValidations from './validations/super-admins';

const app = express();

app.use(express.json());

app.get('/', superAdmins.getAllSuperAdmin);
app.post('/', superAdmins.createSuperAdmin, superAdmValidations);
app.put('/', superAdmins.updateSuperAdmin);
app.delete('/', superAdmins.deleteSuperAdmin);

export default app;
