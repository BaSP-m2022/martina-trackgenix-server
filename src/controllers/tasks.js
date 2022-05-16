import Models from '../models/Tasks';

// Obtain whole list of tasks
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Models.find({});
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await Models.findById(req.params.id);
      return res.status(200).json(task);
    }
    return res.status(400).json({
      message: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

// Create a task
const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'missing id parameter',
      });
    }
    const results = await Models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!results) {
      return res.status(404).json({
        message: 'The task has not been found',
      });
    }
    return res.status(200).json({ results });
  } catch (error) {
    return res.json({
      message: 'an error has ocurred',
      error: error.details[0].message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'task id not found',
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(400).json({
        message: 'task not found',
      });
    }
    return res.status(200).json({
      message: 'the task has been successfully delete',
    });
  } catch (error) {
    return res.json({
      message: 'an error has ocurred',
    });
  }
};
// Delete a task
// tasksRoutes.delete('/:id', (req, res) => {
//   const requiredTask = parseInt(req.params.id, 10);
//   const foundTask = tasks.filter((task) => task.id !== requiredTask);
//   if (foundTask.length === tasks.length) {
//     res.send(`Could not delete task id: ${req.params.id} because it was not found`);
//   } else {
//     writeFile('src/data/tasks.json', JSON.stringify(foundTask), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(`Task id: ${req.params.id} deleted`);
//       }
//     });
//   }
// });

// Edit a task
const createNewTask = async (req, res) => {
  try {
    const newTask = new Models({
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

export default {
  getAllTasks, getTaskById, createNewTask, updateTask, deleteTask,
};
