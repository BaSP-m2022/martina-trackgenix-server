import ProjectsSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectsSchema.find({});

    return res.status(200).json(allProjects);
  } catch (err) {
    return res.status(400).json({
      message: 'An error has occurred',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new ProjectsSchema({

      project_name: req.body.project_name,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
      client: req.body.client,
      active: req.body.active,
      employees: req.body.employees,
      admin_id: req.body.admin_id,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({

      message: 'An error has occured',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllProjects,
  createProject,
};
