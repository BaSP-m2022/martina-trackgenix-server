import TimeSheet from '../models/Time-sheets';

const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await TimeSheet.find({});
    return res.status(200).json({
      message: 'Here is all the list',
      allTimeSheets,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error: true,
    });
  }
};

const getTimeSheetById = async (req, res) => {
  try {
    const success = await TimeSheet.findById(req.params.id);
    if (!success) {
      return res.status(404).json({
        message: 'Time sheet not found',
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet you are looking for:',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error,
    });
  }
};

const getTimeSheetProject = async (req, res) => {
  try {
    const success = await TimeSheet.findOne({
      project_id: req.params.project_id,
    });
    if (!success) {
      return res.status(404).json({
        message: 'Time sheet not found',
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet  which contains the project id you are looking for:',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error,
    });
  }
};

const getTimeSheetDate = async (req, res) => {
  try {
    const success = await TimeSheet.findOne({
      timesheetDate: new Date(req.params.timesheetDate),
    });
    if (!success) {
      return res.status(404).json({
        message: 'Time sheet not found',
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet  of the date you are looking for:',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error,
    });
  }
};

const createNewTimeSheet = async (req, res) => {
  try {
    const newTimeSheet = new TimeSheet({
      employee_id: req.body.employee_id,
      project_id: req.body.project_id,
      task_description: req.body.task_description,
      hs_worked: req.body.hs_worked,
      timesheetDate: new Date(req.body.timesheetDate),
    });
    const success = await newTimeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.details[0].message,
      error: true,
    });
  }
};

const updateTimeSheet = async (req, res) => {
  try {
    const success = await TimeSheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!success) {
      return res.status(404).json({
        msg: 'Time sheet not found',
      });
    }
    return res.status(200).json({
      message: 'Time sheet updated',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error: true,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    const success = await TimeSheet.findByIdAndDelete(req.params.id);
    if (!success) {
      return res.status(404).json({
        message: 'Time sheet not found',
      });
    }
    return res.status(200).json({
      message: 'Time sheet deleted',
      success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      error: true,
    });
  }
};

export default {
  getAllTimeSheets,
  createNewTimeSheet,
  updateTimeSheet,
  deleteTimeSheet,
  getTimeSheetById,
  getTimeSheetProject,
  getTimeSheetDate,
};
