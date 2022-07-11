import Project from '../models/Projects';

const createProject = async (req, res) => {
  try {
    const project = req.body;
    const newProject = await Project.create(project);
    return res.status(201).json({
      message: 'Project created',
      data: newProject,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({}).populate('employees');
    return res.status(200).json({
      message: 'Project found',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Project.findById(req.params.id).populate('employees');
      if (!project) {
        return res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!req.params) {
      return res.status(404).json({
        message: 'Project not found',
        data: req.params.id,
        error: true,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Project has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project has been successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = await Project.findByIdAndDelete(req.params.id);
    if (!projectId) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
