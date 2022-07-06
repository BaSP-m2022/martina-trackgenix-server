import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    phone: Joi.number().min(1000000000).max(9999999999).required()
      .messages({
        'number.min': 'Phone number must be 10 digits long',
        'number.max': 'Phone number must be no more than 10 digits long',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/),
    active: Joi.boolean().required(),
  });

  const validation = newAdmin.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    phone: Joi.number().min(1000000000).max(9999999999).messages({
      'number.min': 'Phone number must be 10 digits long',
      'number.max': 'Phone number must be no more than 10 digits long',
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
    active: Joi.boolean(),
  });

  const validation = newAdmin.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default { validateCreate, validateUpdate };
