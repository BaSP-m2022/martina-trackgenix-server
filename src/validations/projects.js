import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeSchema = Joi.object({
    id: Joi.string().required(),
    role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required(),
    rate: Joi.string().required(),
  });

  const projectValidation = Joi.object({
    project_name: Joi.string().min(1).max(50).required()
      .messages({
        'string.pattern.base': 'Project name must contain only letters',
        'string.min': 'must contain at least 1 characters',
        'string.max': 'must contain at most 50 characters',
      }),
    start_date: Joi.date().required().max('now'),
    finish_date: Joi.date().optional().min('now'),
    client: Joi.string().min(1).max(50).required()
      .messages({
        'string.pattern.base': 'Client name must contain only letters',
        'string.min': 'must contain at least 1 characters',
        'string.max': 'must contain at most 50 characters',
      }),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeeSchema),
  });

  const validate = projectValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'An error occurred during the validation of the request.',
      error: validate.error.details[0].message,
    });
  }
  return next();
};

export default validateCreation;
