import express from 'express';
import admins from './controllers/admins';
import adminsValidation from './validations/admins';

const app = express();

app.use(express.json);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', admins.getAllAdmins);
app.get('/:id', admins.getAdminById);
app.get('/getByName', admins.getAdminByName);
app.get('/getBySurname', admins.getAdminByLastName);
app.put('/', admins.updateAdmin);
app.post('/', adminsValidation, admins.createAdmin);
app.delete('/:id', admins.deleteAdmin);

export default app;
