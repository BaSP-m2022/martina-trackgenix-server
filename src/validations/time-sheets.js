import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const newTimeSheetSchema = Joi.object({
    employee: Joi.string().alphanum().length(24).required(),
    project: Joi.string().alphanum().length(24).required(),
    task: Joi.string().alphanum().length(24).required(),
    hs_worked: Joi.number().required(),
    timesheetDate: Joi.date().required(),
  });

  const validation = newTimeSheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const newTimeSheetSchema = Joi.object({
    employee: Joi.string().alphanum().length(24),
    project: Joi.string().alphanum().length(24),
    task: Joi.string().alphanum().length(24),
    hs_worked: Joi.number(),
    timesheetDate: Joi.date(),
  });

  const validation = newTimeSheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default { validateUpdate, validateCreate };
