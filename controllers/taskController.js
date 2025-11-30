const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const { titre, description, statut } = req.body;
    const { userStoryId } = req.params;

    const task = new Task({
      userStory_id: userStoryId,
      titre,
      description,
      statut: statut || "ToDo",
    });

    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      model: task,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { statut } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    const ancienStatut = task.statut;
    task.statut = statut;
    task.dateModification = new Date();

    // Create history entry
    const HistoriqueTache = require("../models/HistoriqueTache");
    const historique = new HistoriqueTache({
      tache_id: taskId,
      ancienStatut,
      nouveauStatut: statut,
      auteur: req.user.nom || req.user.email,
    });

    await Promise.all([task.save(), historique.save()]);
    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      model: task,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find().populate({
      path: "userStory_id",
      populate: {
        path: "sprint_id",
        match: { project_id: projectId },
      },
    });

    const filteredTasks = tasks.filter((task) => task.userStory_id?.sprint_id);
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      model: filteredTasks,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { titre, description, statut } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    // Track status change if statut is being updated
    if (statut && statut !== task.statut) {
      const HistoriqueTache = require("../models/HistoriqueTache");
      const historique = new HistoriqueTache({
        tache_id: taskId,
        ancienStatut: task.statut,
        nouveauStatut: statut,
        auteur: req.user.nom || req.user.email,
      });
      await historique.save();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { titre, description, statut, dateModification: new Date() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      model: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await Task.deleteOne({ _id: taskId });

    if (result.deletedCount === 0) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
