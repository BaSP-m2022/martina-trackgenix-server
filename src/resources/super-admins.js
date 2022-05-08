const express = require('express');
const fileSystem = require('fs');
const superAdmin = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(superAdmin);
});

router.post('/add', (req, res) => {
  const superAdminData = req.body;
  if (superAdminData.first_name && superAdminData.last_name && superAdminData
    && superAdminData.email && superAdminData.password && superAdminData.active) {
    superAdmin.push(superAdminData);
    fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superAdmin), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Super admin created');
      }
    });
  }
});

module.exports = router;
