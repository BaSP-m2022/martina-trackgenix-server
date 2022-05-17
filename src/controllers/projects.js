import Projects from '../models/Projects';

// EDIT PROJECT BY ID
// eslint-disable-next-line consistent-return
const upDateProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!req.params) {
      return res.status(404).json({
        message: 'Project not found',
        data: req.params.id,
        error: true,
      });
    }
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
      data: error.message,
      error: true,
    });
  }
};

/* if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: req.params.id,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Project edited',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error.message,
      error: true,
    });
  }
}; */

// DELETE PROYECT
const deleteProject = async (req, res) => {
  try {
    const deltProject = await Projects.findByIdAndDelete(req.params.id);
    if (!deltProject) {
      return res.status(404).json({
        message: 'Project not found',
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error: true,
    });
  }
};
export default {
  upDateProject,
  deleteProject,
};
