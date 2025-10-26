const Project = require("../models/Project");

exports.createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      academic_supervisor_id,
      company_supervisor_id,
      start_date,
      end_date,
    } = req.body;
    const studentId = req.user.id;

    // Check if student already has a project
    const existingProject = await Project.findOne({ student_id: studentId });
    if (existingProject) {
      const err = new Error("Student already has a project");
      err.status = 400;
      throw err;
    }

    const project = new Project({
      title,
      description,
      academic_supervisor_id,
      company_supervisor_id,
      student_id: studentId,
      start_date,
      end_date,
    });

    await project.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      model: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate(
      "student_id academic_supervisor_id company_supervisor_id"
    );
    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      model: projects,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "student_id academic_supervisor_id company_supervisor_id"
    );
    if (!project) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      model: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, start_date, end_date },
      { new: true, runValidators: true }
    );
    if (!project) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      model: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const result = await Project.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
