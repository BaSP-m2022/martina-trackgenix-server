import Project from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({});

    return res.status(200).json(allProjects);
  } catch (err) {
    return res.status(400).json({

      message: 'An error has occurred',
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
};
