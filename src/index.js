// use "import" to import libraries
import express from 'express';
import timeSheetsRoutes from './controllers/time-sheets';
import employeesRoutes from './controllers/employees';
import projectsRoutes from './controllers/projects';
import tasksRoutes from './controllers/tasks';
import superAdminRoutes from './controllers/super-admins';
import adminsRoutes from './controllers/admins';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/time-sheets', timeSheetsRoutes);

app.use('/employees', employeesRoutes);
app.use('/projects', projectsRoutes);
app.use('/tasks', tasksRoutes);

app.use('/super-admins', superAdminRoutes);

app.use('/admins', adminsRoutes);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
