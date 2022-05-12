import { Router } from 'express';
import { writeFile } from 'fs';
import projects from '../data/projects.json';

const projectsRoutes = Router();

projectsRoutes.get('/getAll', (req, res) => {
  res.send(projects);
});

projectsRoutes.get('/', (req, res) => {
  const projectId = req.query.id;
  const filterId = projects.some((project) => project.id === projectId);
  const projectName = req.query.project_name;
  const filterName = projects.some((project) => project.project_name === projectName);
  const projectDate = req.query.start_date;
  const filterDate = projects.some((project) => project.start_date === projectDate);
  const projectClient = req.query.client;
  const filterClient = projects.some((project) => project.client === projectClient);
  const projectActive = req.query.active;
  const filterAct = projects.some((project) => JSON.stringify(project.active) === projectActive);
  const projectAdmin = req.query.admin_id;
  const filterAdmin = projects.some((project) => project.admin_id === projectAdmin);
  if (projectId && filterId) {
    res.json(projects.filter((project) => project.id === projectId));
  } else if (projectName && filterName) {
    res.json(projects.filter((project) => project.project_name === projectName));
  } else if (projectDate && filterDate) {
    res.json(projects.filter((project) => project.start_date === projectDate));
  } else if (projectActive && filterAct) {
    res.json(projects.filter((project) => JSON.stringify(project.active) === projectActive));
  } else if (projectClient && filterClient) {
    res.json(projects.filter((project) => project.client === projectClient));
  } else if (projectAdmin && filterAdmin) {
    res.json(projects.filter((project) => project.admin_id === projectAdmin));
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
  writeFile('src/data/projects.json', JSON.stringify(filterProject), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Project deleted');
    }
  });
});

export default projectsRoutes;
