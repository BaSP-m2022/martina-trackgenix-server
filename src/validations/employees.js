import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeTestSchema = Joi.object({
    first_name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(7).max(7).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
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
