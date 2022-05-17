import Joi from 'joi';

const validateTimesheet = (req, res, next) => {
  const newTimeSheetSchema = Joi.object({
    employee_id: Joi.number().min(1).max(100).required(),
    project_id: Joi.number().min(1).max(100).required(),
    task_description: Joi.string().min(50).max(250).required(),
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

export default validateTimesheet;
