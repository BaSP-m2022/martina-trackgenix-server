import { Router } from 'express';
import fileSystem from 'fs';
import projects from '../data/projects.json';

const projectsRoutes = Router();

projectsRoutes.get('/getAll', (req, res) => {
  res.send(projects);
});

projectsRoutes.post('/add', (req, res) => {
  const projectsData = req.body;
  projects.push(projectsData);
  fileSystem.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created');
    }
  });
});

projectsRoutes.put('/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const found = projects.find((project) => project.id === projectId);
  if (found) {
    const proData = req.body;
    projects.forEach((project) => {
      const updPro = project;
      if (updPro.id === projectId) {
        updPro.project_name = proData.project_name ? proData.project_name : project.project_name;
        updPro.start_date = proData.start_date ? proData.start_date : project.start_date;
        updPro.finish_date = proData.finish_date ? proData.finish_date : project.finish_date;
        updPro.client = proData.client ? proData.client : project.client;
        updPro.active = proData.active === updPro.active ? project.active : proData.active;
        updPro.admin_id = proData.admin_id ? proData.admin_id : project.admin_id;
        fileSystem.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(`Project ${req.params.id} edited`);
          }
        });
      }
    });
  } else {
    res.send(`Project with id: ${req.params.id} does not exist`);
  }
});

projectsRoutes.get('/:id', (req, res) => {
  const found = projects.some((project) => project.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(projects.filter((project) => project.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `Not a project with id: ${req.params.id}` });
  }
});

projectsRoutes.get('/', (req, res) => {
  const projectName = req.query.project_name;
  const filterName = projects.some((project) => project.project_name === projectName);
  const projectDate = req.query.start_date;
  const filterDate = projects.some((project) => project.start_date === projectDate);
  const projectClient = req.query.client;
  const filterClient = projects.some((project) => project.client === projectClient);
  const projectActive = req.query.active;
  const filterAct = projects.some((project) => JSON.stringify(project.active) === projectActive);
  if (projectName && filterName) {
    res.json(projects.filter((project) => project.project_name === projectName));
  } else if (projectDate && filterDate) {
    res.json(projects.filter((project) => project.start_date === projectDate));
  } else if (projectActive && filterAct) {
    res.json(projects.filter((project) => JSON.stringify(project.active) === projectActive));
  } else if (projectClient && filterClient) {
    res.json(projects.filter((project) => project.client === projectClient));
  } else {
    res.send('Project not found');
  }
});

projectsRoutes.delete('/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const filterProject = projects.filter((project) => project.id !== projectId);
  if (projects.length === filterProject.length) {
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

export default projectsRoutes;
