import SuperAdmins from '../models/Super-admins';
import firebaseApp from '../helper/firebase';

const getAllSuperAdmin = async (req, res) => {
  try {
    const superAdminList = await SuperAdmins.find({});
    return res.status(200).json({
      message: 'Super Admins List',
      data: superAdminList,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'An error occurred in the Get all method of Super Admin',
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    const result = await SuperAdmins.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Id not found',
        data: req.params.id,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin found',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred in the Get By ID method of Super Admin',
      data: error,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPERADMIN' });

    const newSuperAdmin = await SuperAdmins.create({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      active: req.body.active,
    });
    return res.status(201).json({
      message: 'SuperAdmin has been created',
      data: newSuperAdmin,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await firebaseApp.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmins.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin Updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred in updated Super Admin',
      data: undefined,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmins.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Super Admin has been successfully deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred in deleted Super Admin',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmin,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
