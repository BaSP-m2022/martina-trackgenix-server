import Joi from 'joi';

const validatedAdmin = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
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
      message: 'Invalid input. Please check it.',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default validatedAdmin;
