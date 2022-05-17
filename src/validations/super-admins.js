import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdCreation = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
    active: Joi.boolean().required(),
  });

  const validation = superAdCreation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default validateCreation;
