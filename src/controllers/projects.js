import { Router } from 'express';
import fileSystem from 'fs';
import projects from '../data/projects.json';
import Projects from '../models/Projects';

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

// EDIT PROJECT BY ID
projectsRoutes.put('/:id', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const foundProject = await Projects.findOne({ id: projectId });
    if (foundProject) {
      const proData = req.body;

      foundProject.project_name = proData.project_name
        ? proData.project_name : foundProject.project_name;
      foundProject.start_date = proData.start_date ? proData.start_date : foundProject.start_date;
      foundProject.finish_date = proData.finish_date
        ? proData.finish_date : foundProject.finish_date;
      foundProject.client = proData.client ? proData.client : foundProject.client;
      foundProject.active = proData.active === foundProject.active
        ? foundProject.active : proData.active;
      foundProject.admin_id = proData.admin_id ? proData.admin_id : foundProject.admin_id;

      await foundProject.save();
      return res.status(201).json({
        message: 'Project edited',
        data: foundProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Project not found',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
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

// DELETE PROYECT
projectsRoutes.delete('/:id', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const filterProject = projects.filter((project) => project.id !== projectId);
    if (projects.length === filterProject.length) {
      await filterProject.save();
      return res.status(201).json({
        message: 'Project deleted',
        data: filterProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Project not found',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
});

export default projectsRoutes;
