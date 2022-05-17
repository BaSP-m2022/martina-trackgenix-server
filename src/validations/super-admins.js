import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminCreation = Joi.object({
    firstName: Joi.string()
      .pattern(/^[A-Z]+$/i)
      .min(3)
      .required(),
    lastName: Joi.string()
      .pattern(/^[A-Z]+$/i)
      .min(3)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required(),
    active: Joi.boolean().required(),
  });

  const validation = superAdminCreation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default validateCreation;
