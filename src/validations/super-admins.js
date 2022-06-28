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
    ppassword: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
      }),
    active: Joi.boolean().required().messages({
      'boolean.base': 'You must select an option',
    }),
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
