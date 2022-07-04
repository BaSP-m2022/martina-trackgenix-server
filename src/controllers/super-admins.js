import SuperAdmins from '../models/Super-admins';

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
      message: 'An error occurred in the Get all method of S.Admin',
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
      message: 'An error occurred in the Get By ID method of S.Admin',
      data: error,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const newSuperAdmin = new SuperAdmins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const createOk = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'super Admin created',
      data: createOk,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred in the POST method of S.Admin',
      data: undefined,
      error: false,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmins.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: 'req.params.id',
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
      message: 'An error occurred in the put method S.Admin',
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
      message: 'An error occurred in the DELETE method of S.Admin',
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
