import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeTestSchema = Joi.object({
    id: Joi.number().min(1).required(),
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    phone: Joi.number().min(1000000).max(9999999).required(),
    email: Joi.email().required(),
    password: Joi.password().min(6).max(30).required(),
    active: Joi.boolean().required(),
  });
  const checkValidation = employeeTestSchema.validate(req.body);
  if (checkValidation.error) {
    return res.status(400).json({
      msg: 'Missing Parameter',
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateCreation;
