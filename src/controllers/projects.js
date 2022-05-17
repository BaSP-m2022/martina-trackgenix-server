import projectsSchema from '../data/projects.json';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectsSchema.find({});
    return res.status(200).json(allProjects);
  } catch (err) {
    return res.status(500).json({
      msg: 'An error has occurred',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await projectsSchema.create({
      project_name: req.body.project_name,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
      client: req.body.client,
      active: req.body.active,
      employees: req.body.employees,
      admin_id: req.body.admin_id,
    });
    const result = await project.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occured',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllProjects,
  createProject,
};
