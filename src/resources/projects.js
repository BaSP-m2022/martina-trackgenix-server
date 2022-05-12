import { Router } from 'express';
import { writeFile } from 'fs';
import projects from '../data/projects.json';

const projectsRoutes = Router();

projectsRoutes.get('/getAll', (req, res) => {
  res.send(projects);
});

projectsRoutes.get('/:id', (req, res) => {
  const found = projects.some(
    (project) => project.id === parseInt(req.params.id, 10),
  );
  if (found) {
    res.json(
      projects.filter((project) => project.id === parseInt(req.params.id, 10)),
    );
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
  writeFile('src/data/projects.json', JSON.stringify(filterProject), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Project deleted');
    }
  });
});

export default projectsRoutes;
