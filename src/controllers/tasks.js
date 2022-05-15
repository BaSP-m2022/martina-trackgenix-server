import { Router } from 'express';
import { writeFile } from 'fs';
import tasks from '../data/tasks.json';
import Task from '../models/Tasks';

const tasksRoutes = Router();

// Obtain whole list of tasks
// Obtain task by id
tasksRoutes.get('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === requiredTask);
  if (requiredTask && foundTask) {
    res.json(tasks.filter((task) => task.id === requiredTask));
  } else {
    res.json({ msg: `${req.params.id} was not found` });
  }
});

// Create a task
tasksRoutes.post('/', (req, res) => {
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
tasksRoutes.delete('/:id', (req, res) => {
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
const createNewTask = async (req, res) => {
  try {
    const newTask = new Task({
      description: req.body.description,
    });
    const results = await newTask.save();
    return res.status(200).json({
      message: 'task created',
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error has ocurred',
      error: true,
    });
  }
};

export default { createNewTask };
