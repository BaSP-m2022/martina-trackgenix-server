import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee_id: {
    type: Number,
    required: true,
  },
  project_id: {
    type: Number,
    required: true,
  },
  task_description: {
    type: String,
    required: true,
  },
  hs_worked: {
    type: Number,
    required: true,
  },
  timesheetDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('TimesSheet', timeSheetSchema);
