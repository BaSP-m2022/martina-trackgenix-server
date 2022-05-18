import Project from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({});

    return res.status(200).json({
      message: 'Project',
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
};
