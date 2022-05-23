import Project from '../models/Projects';

// EDIT PROJECT BY ID
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
        data: `id: ${req.params.id}`,
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
      message: 'An error has ocurred',
      data: error.message,
      error: true,
    });
  }
};

// DELETE PROYECT
const deleteProject = async (req, res) => {
  try {
    const deltProject = await Project.findByIdAndDelete(req.params.id);
    if (!deltProject) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error,
      error: true,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({});
    return res.status(200).json({
      message: 'Project found',
      data: allProjects,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const ProjectById = await Project.findOne(req.param.id);
    if (!getProjectById) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: ProjectById,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

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
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
