import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});

    return res.status(200).json({
      msg: 'All employees successfully shown',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({
          message: 'Employee not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Employee found',
        data: employee,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const oneEmployee = req.body;
    const newEmployee = await Employee.create(oneEmployee);
    return res.status(201).json({
      message: 'Employee created',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
      data: undefined,
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        msg: 'Missing Parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active,
      },
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
      msg: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        msg: 'Missing parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Employee requested was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.json(400).json({
      msg: error.message,
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
