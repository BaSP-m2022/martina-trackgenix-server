import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectsSchema = new Schema({
  project_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  finish_date: { type: Date, required: false },
  client: { type: String, required: true },
  active: { type: Boolean, required: true },
  employees: [{
    id: { type: Number },
    role: { type: String, required: true, enum: ['DEV', 'PM', 'QA', 'TL'] },
    rate: { type: String, required: true },
  }],
  admin_id: { type: String, required: true },
});

export default mongoose.model('Projects', projectsSchema);
