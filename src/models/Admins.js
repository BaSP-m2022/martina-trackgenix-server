import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true },
    active: { type: Boolean, required: true },
    firebaseUid: { type: String, required: true },
  },
);

export default mongoose.model('Admin', adminSchema);
