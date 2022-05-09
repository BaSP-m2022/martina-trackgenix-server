const express = require('express');
const fileSystem = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();
// Obtain whole list of tasks
router.get('/getAll', (req, res) => {
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
// Obtain a task by description and by id
router.get('/', (req, res) => {
  const requiredTaskId = parseInt(req.query.id, 10);
  const foundTaskId = tasks.some((task) => task.id === requiredTaskId);
  const requiredTask = req.query.description;
  const foundTaskDesc = tasks.some((description) => description.description === requiredTask);
  if (requiredTaskId && foundTaskId) {
    res.json(tasks.filter((task) => task.id === requiredTaskId));
  } else if (requiredTask && foundTaskDesc) {
    res.json(tasks.filter((description) => description.description === requiredTask));
  } else {
    res.json({ msg: `${req.query.description} was not found` });
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
// Edit a task
router.put('/:id', (req, res) => {
  const requiredTask = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === requiredTask);
  if (foundTask) {
    const taskData = req.body;
    tasks.forEach((data) => {
      const updTask = data;
      if (updTask.id === requiredTask) {
        updTask.description = taskData.description ? taskData.description : data.description;
        fileSystem.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
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

module.exports = router;
