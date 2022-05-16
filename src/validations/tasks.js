import Joi from 'joi';

const validateNewTask = (req, res, next) => {
  const newTaskSchema = Joi.object({
    description: Joi.string().min(12).max(80).required(),
  });
  const validation = newTaskSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default { validateNewTask };
