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

module.exports = router;
