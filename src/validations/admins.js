import Joi from 'joi';

const validateNewAdmin = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(3).max(18).required(),
    lastName: Joi.string().min(3).max(18).required(),
    phone: Joi.string().min(10).max(13).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    active: Joi.boolean().valid(true, false).required(),
  });

  const validation = newAdmin.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Invalid input. Please check it.',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdatedAdmin = (req, res, next) => {
  const updatedAdmin = Joi.object({
    firstName: Joi.string().min(3).max(18).optional(),
    lastName: Joi.string().min(3).max(18).optional(),
    phone: Joi.string().min(10).max(13).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    active: Joi.boolean().valid(true, false).optional(),
  });

  const updatedValidation = updatedAdmin.validate(req.body);
  if (updatedValidation.error) {
    return res.status(400).json({
      message: 'Invalid input. Please check it.',
      data: updatedValidation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validateNewAdmin,
  validateUpdatedAdmin,
};
