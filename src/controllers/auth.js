import Employee from '../models/Employees';
import Admin from '../models/Admins';
import firebaseApp from '../helper/firebase';

const getAuth = async (req, res) => {
  try {
    const employee = await Employee.findOne({ firebaseUid: req.headers.firebaseuid });
    if (employee) {
      return res.status(201).json({
        message: 'Employee found',
        data: employee,
        error: false,
      });
    }

    const admin = await Admin.findOne({ firebaseUid: req.headers.firebaseuid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }

    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const register = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const newEmployee = await Employee.create({
      firebaseUid: newFirebaseUser.uid,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      active: req.body.active,
    });
    return res.status(201).json({
      message: 'Employee has been created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await firebaseApp.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default { getAuth, register };
