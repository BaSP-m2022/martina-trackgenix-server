import TimeSheet from '../models/Time-sheets';

const getAllTimeSheets = async (req, res) => {
  try {
    const allTimeSheets = await TimeSheet.find({}).populate('employees projects tasks');

    return res.status(200).json({
      message: 'Here is all the list',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getTimeSheetById = async (req, res) => {
  try {
    const timeSheetById = await TimeSheet.findById(req.params.id).populate('employees projects tasks');
    if (!timeSheetById) {
      return res.status(404).json({
        message: 'Time sheet id not found',
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet you are looking for:',
      data: timeSheetById,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'An error ocurred',
      data: error,
      error: true,
    });
  }
};

const getTimeSheetByProject = async (req, res) => {
  try {
    const timeSheetByProject = await TimeSheet.findOne({
      project_id: req.params.project_id,
    }).populate('projects');
    if (!timeSheetByProject) {
      return res.status(404).json({
        message: 'Time sheet not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet  which contains the project id you are looking for:',
      data: timeSheetByProject,
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

const getTimeSheetByDate = async (req, res) => {
  try {
    const timeSheetByDate = await TimeSheet.findOne({
      timesheetDate: new Date(req.params.timesheetDate),
    });
    if (!timeSheetByDate) {
      return res.status(404).json({
        message: 'Time sheet not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Here is the time sheet  of the date you are looking for:',
      data: timeSheetByDate,
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

const createNewTimeSheet = async (req, res) => {
  try {
    const timeSheetData = req.body;

    const newTimeSheet = await TimeSheet.create(timeSheetData);
    return res.status(201).json({
      message: 'Time sheet created',
      data: newTimeSheet,
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

const updateTimeSheet = async (req, res) => {
  try {
    const result = await TimeSheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Time sheet not found',
        data: `id: ${req.params.id}`,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time sheet updated',
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

const deleteTimeSheet = async (req, res) => {
  try {
    const result = await TimeSheet.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Time sheet not found',
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
  getAllTimeSheets,
  createNewTimeSheet,
  updateTimeSheet,
  deleteTimeSheet,
  getTimeSheetById,
  getTimeSheetByProject,
  getTimeSheetByDate,
};
