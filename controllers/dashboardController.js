const Task = require("../models/Task");
const Meeting = require("../models/Meeting");
const Report = require("../models/Report");
const Journal = require("../models/Journal");
const UserStory = require("../models/UserStory");
const Sprint = require("../models/Sprint");

exports.getStudentDashboard = async (req, res) => {
  try {
    const { projectId } = req.params;

    const meetings = await Meeting.find({ project_id: projectId });
    const reports = await Report.find({ project_id: projectId });
    const journal = await Journal.find({ project_id: projectId });
    const tasks = await Task.find().populate({
      path: "userStory_id",
      populate: {
        path: "sprint_id",
        match: { project_id: projectId },
      },
    });

    const filteredTasks = tasks.filter((task) => task.userStory_id?.sprint_id);

    res.status(200).json({
      meetings,
      reports,
      journal,
      tasks: filteredTasks,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error fetching student dashboard",
        error: err.message,
      });
  }
};

exports.getSupervisorDashboard = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ status: "done" }).populate({
      path: "userStory_id",
      populate: {
        path: "sprint_id",
        match: { project_id: projectId },
      },
    });

    const filteredTasks = tasks.filter((task) => task.userStory_id?.sprint_id);

    const meetings = await Meeting.find({ project_id: projectId });

    res.status(200).json({
      tasks: filteredTasks,
      meetings,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error fetching supervisor dashboard",
        error: err.message,
      });
  }
};

exports.getProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;

    const sprints = await Sprint.find({ project_id: projectId });
    const userStories = await UserStory.find().populate({
      path: "sprint_id",
      match: { project_id: projectId },
    });

    const filteredStories = userStories.filter((us) => us.sprint_id);

    const tasks = await Task.find().populate({
      path: "userStory_id",
      populate: {
        path: "sprint_id",
        match: { project_id: projectId },
      },
    });

    const filteredTasks = tasks.filter((task) => task.userStory_id?.sprint_id);

    const totalTasks = filteredTasks.length;
    const doneTasks = filteredTasks.filter(
      (task) => task.status === "done"
    ).length;
    const standbyTasks = filteredTasks.filter(
      (task) => task.status === "standby"
    ).length;

    const progress =
      totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    res.status(200).json({
      totalTasks,
      doneTasks,
      standbyTasks,
      progressPercent: progress,
      sprints: sprints.length,
      userStories: filteredStories.length,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching project progress", error: err.message });
  }
};
