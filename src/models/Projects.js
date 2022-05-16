import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectsSchema = new Schema({
  project_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  finish_date: { type: Date, required: false },
  client: { type: String, required: true },
  active: { type: Boolean, required: true },
  employees: { type: [Object], required: true },
  admin_id: { type: Number, required: true },
});

export default mongoose.model('Projects', projectsSchema);
