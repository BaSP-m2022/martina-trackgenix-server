import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  project_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  finish_date: { type: Date, required: false },
  client: { type: String, required: true },
  active: { type: Boolean },
  employees: {
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
  },
});

export default mongoose.model('Project', projectSchema);
