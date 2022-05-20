import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'employees',
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'projects',
  },
  task: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'tasks',
    },
    description: {
      type: String,
      required: true,
    },
  }],
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
