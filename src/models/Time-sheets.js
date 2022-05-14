import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;

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
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('time-sheet', timeSheetSchema);
