const Project = require("../models/Project");

exports.createProject = async (req, res, next) => {
  try {
    const {
      titre,
      description,
      academic_supervisor_id,
      company_supervisor_id,
      dateDebut,
      dateFin,
      statut,
    } = req.body;
    const studentId = req.user.id;

    // Check if student already has 2 projects (max 1-2 according to diagram)
    const existingProjects = await Project.find({ student_id: studentId });
    if (existingProjects.length >= 2) {
      const err = new Error(
        "Student already has maximum number of projects (2)"
      );
      err.status = 400;
      throw err;
    }

    const project = new Project({
      titre,
      description,
      academic_supervisor_id,
      company_supervisor_id,
      student_id: studentId,
      dateDebut,
      dateFin,
      statut: statut || "Actif",
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
    const { titre, description, dateDebut, dateFin, statut } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { titre, description, dateDebut, dateFin, statut },
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
