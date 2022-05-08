/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable radix */
const express = require('express');
const fileSystem = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(superAdmins);
});

router.post('/add', (req, res) => {
  const superAdminData = req.body;
  if (superAdminData.first_name && superAdminData.last_name && superAdminData
    && superAdminData.email && superAdminData.password && superAdminData.active) {
    superAdmins.push(superAdminData);
    fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super admin created');
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const found = superAdmins.some(superAdmin => superAdmin.id === parseInt(req.params.id));
  if (found) {
    const superAdminData = req.body;
    superAdmins.forEach((superAdmin) => {
      const sa = superAdmin;
      if (sa.id === parseInt(req.params.id)) {
        sa.first_name = superAdminData.first_name ? superAdminData.first_name : sa.first_name;
        sa.last_name = superAdminData.last_name ? superAdminData.last_name : sa.last_name;
        sa.email = superAdminData.email ? superAdminData.email : sa.email;
        sa.password = superAdminData.password ? superAdminData.password : sa.password;
        sa.active = superAdminData.active ? superAdminData.active : sa.active;
        fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Super admin edited');
          }
        });
      }
    });
  }
});

module.exports = router;
