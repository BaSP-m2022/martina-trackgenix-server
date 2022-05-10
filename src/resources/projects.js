import { Router } from 'express';
import { writeFile } from 'fs';
import projects from '../data/projects.json';

const projectsRouter = Router();

projectsRouter.get('/getAll', (req, res) => {
  res.send(projects);
});

projectsRouter.post('/add', (req, res) => {
  const projectsData = req.body;
  projects.push(projectsData);
  writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created');
    }
  });
});

projectsRouter.put('/:id', (req, res) => {
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
        updPro.employee.length = proData.employee.length ? proData.employee : project.employee;
        writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(`Project ${req.params.id} edited`);
          }
        });
      } else {
        res.send(`Project with id: ${req.params.id} does not exit`);
      }
    });
  }
});

export default projectsRouter;
