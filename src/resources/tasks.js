import { Router } from 'express';
import { writeFile } from 'fs';
import tasks from '../data/tasks.json';

const tasksRouter = Router();

// Obtain whole list of tasks
tasksRouter.get('/', (req, res) => {
  res.send(tasks);
});

// Obtain a task by description and by id
tasksRouter.get('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === requiredTask);
  if (requiredTask && foundTask) {
    res.json(tasks.filter((task) => task.id === requiredTask));
  } else {
    res.json({ msg: `${req.params.id} was not found` });
  }
});

// Create a task
tasksRouter.post('/', (req, res) => {
  const taskData = req.body;
  if (taskData.id && taskData.description) {
    tasks.push(taskData);
    writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Task created: ${JSON.stringify(taskData)}`);
      }
    });
  } else {
    res.send('Task data is incomplete');
  }
});

// Delete a task
tasksRouter.delete('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.filter((task) => task.id !== requiredTask);
  if (foundTask.length === tasks.length) {
    res.send(`Could not delete task id: ${req.params.id} because it was not found`);
  } else {
    writeFile('src/data/tasks.json', JSON.stringify(foundTask), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Task id: ${req.params.id} deleted`);
      }
    });
  }
});

// Edit a task
tasksRouter.put('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === requiredTask);
  if (foundTask) {
    const taskData = req.body;
    tasks.forEach((data) => {
      const updTask = data;
      if (updTask.id === requiredTask) {
        updTask.description = taskData.description ? taskData.description : data.description;
        writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send(`Task id: ${req.params.id} edited`);
          }
        });
      }
    });
  } else {
    res.send(`There is no task id: ${req.params.id}`);
  }
});

export default tasksRouter;
