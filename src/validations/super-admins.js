import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdValidation = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    active: Joi.boolean(),
  });
  const validation = superAdValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};
export default validateCreation;
