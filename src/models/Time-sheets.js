import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employees: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'employee',
    },
  },
  projects: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'project',
    },
  },
  tasks: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'task',
    },
    description: {
      type: String,
      required: true,
    },
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
