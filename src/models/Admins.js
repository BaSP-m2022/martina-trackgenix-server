import mongoose from 'mongoose';

const Schema = mongoose.Schema();

const adminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: String, required: true },
  },
);

export default mongoose.model('Admin', adminSchema);
