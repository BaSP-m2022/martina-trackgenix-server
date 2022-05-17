import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
);

export default mongoose.model('Task', taskSchema);
