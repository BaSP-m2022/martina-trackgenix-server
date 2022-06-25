import Employee from '../models/Employees';
import Admin from '../models/Admins';

const getAuth = async (req, res) => {
  try {
    const employee = await Employee.findOne({ firebaseUid: req.firebaseUid });
    if (employee) {
      return res.status(201).json({
        message: 'Employee found',
        data: employee,
      });
    }

    const admin = await Admin.findOne({ firebaseUid: req.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
      });
    }

    return res.status(204).json({
      message: 'User not found',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

export default { getAuth };
