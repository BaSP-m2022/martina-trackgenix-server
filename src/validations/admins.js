import Joi from 'joi';

const validatedAdmin = (req, res, next) => {
  const newAdmin = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
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
