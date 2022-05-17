import Joi from 'joi';

const validateProject = (req, res, next) => {
  const employeeProjectSchema = Joi.object({
    id: Joi.number().optional(),
    role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required(),
    rate: Joi.string().required(),
  });

  const editProjectSchema = Joi.object({
    project_name: Joi.string().min(5).max(20).optional(),
    start_date: Joi.date().optional(),
    finish_date: Joi.date().optional(),
    client: Joi.string().min(10).max(50).optional(),
    active: Joi.boolean().optional(),
    employees: Joi.array().items(employeeProjectSchema),
    admin_id: Joi.string().min(1).max(50).required(),
  });

  const validation = editProjectSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'Error during the request or validation',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default validateProject;
