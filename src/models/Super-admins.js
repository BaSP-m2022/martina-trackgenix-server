import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
});

export default mongoose.model('SuperAdmins', superAdminSchema);
