import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminCreation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'First name must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
      }),
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

const validateUpdate = (req, res, next) => {
  const superAdminCreation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'First name must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
    active: Joi.boolean(),
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

export default { validateCreation, validateUpdate };
