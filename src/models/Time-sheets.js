import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  task: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
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
