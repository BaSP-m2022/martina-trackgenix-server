import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    active: { type: String, required: true },
  },
);

export default mongoose.model('Admin', adminSchema);
