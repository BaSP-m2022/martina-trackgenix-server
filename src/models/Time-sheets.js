import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'employee',
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'project',
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'task',
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

export default mongoose.model('TimeSheet', timeSheetSchema);
