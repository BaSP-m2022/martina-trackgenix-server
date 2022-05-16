import { Router } from 'express';
import fileSystem from 'fs';

const superAdmins = require('../data/super-admins.json');

const superAdControllers = Router();

superAdControllers.post('/', (req, res) => {
  const superAdminData = req.body;
  if (
    superAdminData.id &&
    superAdminData.first_name &&
    superAdminData.last_name &&
    superAdminData &&
    superAdminData.email &&
    superAdminData.password &&
    superAdminData.active
  ) {
    superAdmins.push(superAdminData);
    fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super admin created');
      }
    });
  } else {
    res.send('Super admin data should be complete in order to create it');
  }
});

superAdControllers.put('/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    const superAdminData = req.body;
    superAdmins.forEach((superAdmin) => {
      const sa = superAdmin;
      if (sa.id === parseInt(req.params.id, 10)) {
        sa.active = superAdminData.active === sa.active ? sa.active : superAdminData.active;
        sa.first_name = superAdminData.first_name ? superAdminData.first_name : sa.first_name;
        sa.last_name = superAdminData.last_name ? superAdminData.last_name : sa.last_name;
        sa.email = superAdminData.email ? superAdminData.email : sa.email;
        sa.password = superAdminData.password ? superAdminData.password : sa.password;
        fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Super admin edited');
          }
        });
      }
    });
  } else {
    res.send(`No super admin with the id of ${req.params.id}`);
  }
});

superAdControllers.delete('/:id', (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const filterSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminId);
  if (filterSuperAdmins.length === superAdmins.length) {
    res.send(`Could not delete because user with the id of ${req.params.id} was not found`);
  } else {
    fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(filterSuperAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Super admin with the id of ${req.params.id} deleted`);
      }
    });
  }
});

superAdControllers.get('/', (req, res) => {
  const superAdminId = parseInt(req.query.id, 10);
  const foundId = superAdmins.some((superAdmin) => superAdmin.id === superAdminId);
  const superAdminName = req.query.first_name;
  const foundName = superAdmins.some((superAdmin) => superAdmin.first_name === superAdminName);
  const superAdminLastName = req.query.last_name;
  const fLastName = superAdmins.some((superAdmin) => superAdmin.last_name === superAdminLastName);
  const superAdminActive = req.query.active;
  const fa = superAdmins.some((sa) => JSON.stringify(sa.active) === superAdminActive);
  if (superAdminId && foundId) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.id === superAdminId));
  } else if (superAdminName && foundName) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.first_name === superAdminName));
  } else if (superAdminLastName && fLastName) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.last_name === superAdminLastName));
  } else if (superAdminActive && fa) {
    res.json(superAdmins.filter((sa) => JSON.stringify(sa.active) === superAdminActive));
  } else {
    res.json({ msg: 'Super admin not found, here is all the list', superAdmins });
  }
});

export default superAdControllers;
