import Admin from '../models/Admins';
import firebaseApp from '../helper/firebase';

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    const newAdmin = await Admin.create({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      active: req.body.active,
    });
    return res.status(201).json({
      message: 'Admin has been created',
      data: newAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

// Get whole list of admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});

    return res.status(200).json({
      message: 'Admins whole list',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

// Get admin by id
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: undefined,
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

// Get admin by first name
const getAdminByName = async (req, res) => {
  try {
    const name = await Admin.findOne({ firstName: req.query.firstName });
    if (name) {
      return res.status(200).json({
        message: 'Admin found',
        data: name,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: undefined,
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

// Get admin by last name
const getAdminByLastName = async (req, res) => {
  try {
    const lastName = await Admin.findOne({ lastName: req.query.lastName });
    if (lastName) {
      return res.status(200).json({
        message: 'Admin found',
        data: lastName,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: req.query,
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

    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active,
      },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: `id: ${req.params.id}`,
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
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Admin has not been found',
        data: req.params.id,
        error: true,
      });
    }
    return res.status(204).json();
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
  getAdminByName,
  getAdminByLastName,
  updateAdmin,
  deleteAdmin,
};
