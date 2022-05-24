import Task from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({
      message: 'Tasks found',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await Task.findById(req.params.id);
      return res.status(200).json({
        message: 'Task found',
        data: task,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'task not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'an error has ocurred',
      data: error,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      res.status(404).json({
        message: 'task not found',
        data: undefined,
        error: true,
      });
    }
    const taskData = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taskData) {
      return res.status(404).json({
        message: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'task has been updated',
      data: taskData,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'an error has ocurred',
      data: error.details[0].message,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskData = await Task.findByIdAndDelete(req.params.id);
    if (!taskData) {
      return res.status(404).json({
        message: 'task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.json({
      message: 'an error has ocurred',
      data: error,
      error: true,
    });
  }
};

const createNewTask = async (req, res) => {
  try {
    const newTaskData = new Task({
      description: req.body.description,
    });
    const taskData = await newTaskData.save();
    return res.status(201).json({
      message: 'task created',
      data: taskData,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createNewTask,
  updateTask,
  deleteTask,
};
