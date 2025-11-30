const Sprint = require("../models/Sprint");

exports.createSprint = async (req, res, next) => {
  try {
    const { numero, nom, dateDebut, dateFin, statut } = req.body;
    const { projectId } = req.params;

    const sprint = new Sprint({
      project_id: projectId,
      numero,
      nom,
      dateDebut,
      dateFin,
      statut: statut || "Planifie",
    });

    await sprint.save();
    res.status(201).json({
      success: true,
      message: "Sprint created successfully",
      model: sprint,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSprints = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const sprints = await Sprint.find({ project_id: projectId });
    res.status(200).json({
      success: true,
      message: "Sprints fetched successfully",
      model: sprints,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSprintById = async (req, res, next) => {
  try {
    const { projectId, sprintId } = req.params;
    const sprint = await Sprint.findOne({
      _id: sprintId,
      project_id: projectId,
    });
    if (!sprint) {
      const err = new Error("Sprint not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Sprint fetched successfully",
      model: sprint,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSprint = async (req, res, next) => {
  try {
    const { projectId, sprintId } = req.params;
    const { numero, nom, dateDebut, dateFin, statut } = req.body;

    const sprint = await Sprint.findOneAndUpdate(
      { _id: sprintId, project_id: projectId },
      { numero, nom, dateDebut, dateFin, statut },
      { new: true, runValidators: true }
    );

    if (!sprint) {
      const err = new Error("Sprint not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Sprint updated successfully",
      model: sprint,
    });
  } catch (err) {
    next(err);
  }
};
