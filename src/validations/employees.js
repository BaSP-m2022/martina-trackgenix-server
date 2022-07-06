import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeSchema = Joi.object({
    first_name: Joi.string().min(3).max(15).required(),
    last_name: Joi.string().min(3).max(15).required(),
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
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
      }),
    active: Joi.boolean().required(),
  });

  const checkValidation = employeeSchema.validate(req.body);
  if (checkValidation.error) {
    return res.status(400).json({
      msg: checkValidation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const employeeSchema = Joi.object({
    first_name: Joi.string().min(3).max(15),
    last_name: Joi.string().min(3).max(15),
    phone: Joi.number().min(1000000000).max(9999999999)
      .messages({
        'number.min': 'Phone number must be 10 digits long',
        'number.max': 'Phone number must be no more than 10 digits long',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
    active: Joi.boolean(),
  });

  const checkValidation = employeeSchema.validate(req.body);
  if (checkValidation.error) {
    return res.status(400).json({
      msg: checkValidation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default { validateCreation, validateUpdate };
