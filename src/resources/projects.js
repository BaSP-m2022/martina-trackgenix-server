const express = require('express');

const router = express.Router();
const fileSystem = require('fs');
const project = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(project);
});

router.get('/', (req, res) => {
  const projectId = req.query.id;
  const filterId = project.some((projects) => projects.id === projectId);
  const projectName = req.query.project_name;
  const filterName = project.some((projects) => projects.project_name === projectName);
  const projectDate = req.query.start_date;
  const filterDate = project.some((projects) => projects.start_date === projectDate);
  const projectClient = req.query.client;
  const filterClient = project.some((projects) => projects.client === projectClient);
  const projectActive = req.query.active;
  const filterAct = project.some((projects) => JSON.stringify(projects.active) === projectActive);
  const projectAdmin = req.query.admin_id;
  const filterAdmin = project.some((projects) => projects.admin_id === projectAdmin);
  if (projectId && filterId) {
    res.json(project.filter((projects) => projects.id === projectId));
  } else if (projectName && filterName) {
    res.json(project.filter((projects) => projects.project_name === projectName));
  } else if (projectDate && filterDate) {
    res.json(project.filter((projects) => projects.start_date === projectDate));
  } else if (projectActive && filterAct) {
    res.json(project.filter((projects) => JSON.stringify(projects.active) === projectActive));
  } else if (projectClient && filterClient) {
    res.json(project.filter((projects) => projects.client === projectClient));
  } else if (projectAdmin && filterAdmin) {
    res.json(project.filter((projects) => projects.admin_id === projectAdmin));
  } else {
    res.send('Project not found');
  }
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  if (projectData.project_name && projectData.start_date && projectData.client
      && projectData.admin_id) {
    project.push(projectData);
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(project), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('Project created');
      }
    });
  } else {
    res.send('Project not crated missing information');
  }
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filterProject = project.filter((projects) => projects.id !== projectId);
  if (project.length === filterProject.length) {
    res.send('The project is not delete because it was not found');
  }
  fileSystem.writeFile('src/data/projects.json', JSON.stringify(filterProject), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Project deleted');
    }
  });
});

module.exports = router;
