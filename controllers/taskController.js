const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const { userStoryId } = req.params;

    const task = new Task({
      userStory_id: userStoryId,
      title,
      description,
      priority,
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
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    task.status = status;
    task.history.push({ status, changedAt: new Date() });

    await task.save();
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
    const { title, description, priority, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, priority, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      model: task,
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
