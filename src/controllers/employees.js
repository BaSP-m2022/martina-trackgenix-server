import EmployeeModel from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const AllEmployees = await EmployeeModel.find({});
    return res.status(200).json({
      msg: 'All employees successfully shown',
      data: AllEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const oneEmployee = await EmployeeModel.findById(req.params.id);
      return res.status(200).json({
        msg: 'Employee successfully shown',
        data: oneEmployee,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'Missing Id Parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(404).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const oneEmployee = new EmployeeModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await oneEmployee.save();
    return res.status(201).json({
      msg: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing Parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Employee requested was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Employee updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Employee requested was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      msg: 'Employee requested was deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getEmployeeById,
  getAllEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
};
