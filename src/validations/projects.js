import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeSchema = Joi.object({
    id: Joi.number().optional(),
    role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required(),
    rate: Joi.string().required(),
  });

  const projectValidation = Joi.object({
    project_name: Joi.string().min(1).max(50).required(),
    start_date: Joi.date().required(),
    finish_date: Joi.date().optional(),
    client: Joi.string().min(1).max(50).required(),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeeSchema),
    admin_id: Joi.string().min(1).max(50).required(),
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
