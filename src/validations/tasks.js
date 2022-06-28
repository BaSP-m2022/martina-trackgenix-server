import Joi from 'joi';

const validateNewTask = (req, res, next) => {
  const newTaskSchema = Joi.object({
    description: Joi.string().min(12).max(80).required()
      .messages({
        'string.pattern.base': 'Project name must contain only letters',
        'string.min': 'must contain at least 12 characters',
        'string.max': 'must contain at most 80 characters',
      }),
  });
  const validation = newTaskSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Invalid input. Please check it.',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default validateNewTask;
