import Models from '../models/Admins';

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const admin = new Models({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });

    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

// Get whole list of admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Models.find();

    return res.status(200).json({
      message: 'Admins whole list',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

// Get admin by id
const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await Models.findById(req.params.id);

      return res.status(200).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

// Edit an admin
const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        message: 'Admin not found',
        data: req.params.id,
        error: true,
      });
    }

    const result = await Models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin has been successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error.details[0].message,
      error: true,
    });
  }
};
// Delete an admin
const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: req.params.id,
        error: true,
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'The admin has been successfully deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

export default {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
