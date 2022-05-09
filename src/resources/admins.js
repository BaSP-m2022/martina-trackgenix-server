import { Router } from 'express';
import fileSystem from 'fs';

const admins = require('../data/admins.json');

const adminsRoutes = Router();

// Create admin
adminsRoutes.post('/', (req, res) => {
  const newAdmin = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    active: true,
  };
  const existingAdmin = admins.some((admin) => admin.id === parseInt(req.body.id, 10));
  if (existingAdmin) {
    return res.send(400).json({ msg: 'Admin with that id already exists' });
  }
  if (!newAdmin.id || !newAdmin.first_name || !newAdmin.last_name || !newAdmin.phone
      || !newAdmin.email || !newAdmin.password) {
    return res.status(400).json({ msg: 'Please include all the admin information' });
  }

  admins.push(newAdmin);

  fileSystem.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      return res.send(err);
    }
    return res.send('Admin created');
  });
  return res.json(newAdmin);
});

// Edit admin
adminsRoutes.put('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (found) {
    const updAdmin = req.body;
    admins.forEach((admin) => {
      if (admin.id === parseInt(req.params.id, 10)) {
        const adminToEdit = admin;
        adminToEdit.first_name = updAdmin.first_name ? updAdmin.first_name : adminToEdit.first_name;
        adminToEdit.last_name = updAdmin.last_name ? updAdmin.last_name : adminToEdit.last_name;
        adminToEdit.phone = updAdmin.phone ? updAdmin.phone : adminToEdit.phone;
        adminToEdit.email = updAdmin.email ? updAdmin.email : adminToEdit.email;
        adminToEdit.password = updAdmin.password ? updAdmin.password : adminToEdit.password;

        fileSystem.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
          if (err) {
            return res.send(err);
          }
          return res.send('Admin updated');
        });
      }
    });
  } else {
    res.status(400).json({ msg: `Not admin with the id of ${req.params.id}` });
  }
});

// Get admin
adminsRoutes.get('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(admins.filter((admin) => admin.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `Not an admin with id: ${req.params.id}` });
  }
});

// Delete admin
adminsRoutes.delete('/:id', (req, res) => {
  const found = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (found) {
    const filterAdmins = admins.filter((admin) => admin.id !== parseInt(req.params.id, 10));
    if (filterAdmins.length === admins.length) {
      res.status(400).json({ msg: `Not an admin with id: ${req.params.id}` });
    } else {
      fileSystem.writeFile('src/data/admins.json', JSON.stringify(filterAdmins), (err) => {
        if (err) {
          return res.send(err);
        }
        return res.send(`Admin with id: ${req.params.id} deleted`);
      });
    }
    return res.send('Admin deleted');
  }
  return res.status(400).json({ msg: `Not an admin with id: ${req.params.id}` });
});

// Get all admins
adminsRoutes.get('/', (req, res) => res.json(admins));

export default adminsRoutes;
