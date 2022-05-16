import Joi from 'joi';

const validateProject = (req, res, next) => {
  const newProjectSchema = Joi.object({
    project_name: Joi.string().min(5).max(20).required(),
    start_date: Joi.date().min(3).max(100).required(),
    finish_date: Joi.date().min(3).max(100).required(),
    client: Joi.string().min(10).max(50).required(),
    active: Joi.boolean().required(),
    employees: Joi.object().Joi.object().keys({
      employee_id: Joi.number().min(1).required(),
      role: Joi.string().min(5).max(50).required(),
      rate: Joi.number().required(),
    }),
  });

  const validation = newProjectSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'Error during the request or validation',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { validateProject };
