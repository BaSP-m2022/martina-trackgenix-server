const express = require('express');
const fileSystem = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

// Obtain whole list of tasks
router.get('/', (req, res) => {
  res.send(tasks);
});
// Create a task
router.post('/', (req, res) => {
  const taskData = req.body;
  if (taskData.id && taskData.description) {
    tasks.push(taskData);
    fileSystem.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
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
// Obtain a task by id
router.get('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === requiredTask);
  if (foundTask) {
    res.send(foundTask);
  } else {
    res.send(`Task ${req.params.id} was not found`);
  }
});
// Delete a task
router.delete('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.filter((task) => task.id !== requiredTask);
  if (foundTask.length === tasks.length) {
    res.send(`Could not delete task id: ${req.params.id} because it was not found`);
  } else {
    fileSystem.writeFile('src/data/tasks.json', JSON.stringify(foundTask), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Task id: ${req.params.id} deleted`);
      }
    });
  }
});
module.exports = router;
