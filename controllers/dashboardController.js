const Task = require("../models/Task");
const Meeting = require("../models/Meeting");
const Report = require("../models/Report");
const Journal = require("../models/Journal");
const UserStory = require("../models/UserStory");
const Sprint = require("../models/Sprint");

exports.getStudentDashboard = async (req, res, next) => {
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
      success: true,
      message: "Student dashboard data fetched successfully",
      model: {
        meetings,
        reports,
        journal,
        tasks: filteredTasks,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSupervisorDashboard = async (req, res, next) => {
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
      success: true,
      message: "Supervisor dashboard data fetched successfully",
      model: {
        tasks: filteredTasks,
        meetings,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectProgress = async (req, res, next) => {
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
      success: true,
      message: "Project progress data fetched successfully",
      model: {
        totalTasks,
        doneTasks,
        standbyTasks,
        progressPercent: progress,
        sprints: sprints.length,
        userStories: filteredStories.length,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectStatistics = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Get all project data
    const [sprints, meetings, reports, journalEntries, tasks] =
      await Promise.all([
        Sprint.find({ project_id: projectId }),
        Meeting.find({ project_id: projectId }),
        Report.find({ project_id: projectId }),
        Journal.find({ project_id: projectId }),
        Task.find().populate({
          path: "userStory_id",
          populate: {
            path: "sprint_id",
            match: { project_id: projectId },
          },
        }),
      ]);

    const filteredTasks = tasks.filter((task) => task.userStory_id?.sprint_id);

    // Calculate statistics
    const taskStats = {
      total: filteredTasks.length,
      todo: filteredTasks.filter((task) => task.status === "todo").length,
      inProgress: filteredTasks.filter((task) => task.status === "in_progress")
        .length,
      standby: filteredTasks.filter((task) => task.status === "standby").length,
      done: filteredTasks.filter((task) => task.status === "done").length,
    };

    const meetingStats = {
      total: meetings.length,
      planned: meetings.filter((meeting) => meeting.status === "planned")
        .length,
      completed: meetings.filter((meeting) => meeting.status === "completed")
        .length,
      validated: meetings.filter((meeting) => meeting.validated).length,
    };

    const reportStats = {
      total: reports.length,
      draft: reports.filter((report) => report.status === "draft").length,
      submitted: reports.filter((report) => report.status === "submitted")
        .length,
      approved: reports.filter((report) => report.status === "approved").length,
      rejected: reports.filter((report) => report.status === "rejected").length,
    };

    res.status(200).json({
      success: true,
      message: "Project statistics fetched successfully",
      model: {
        sprints: sprints.length,
        userStories: await UserStory.find()
          .populate({
            path: "sprint_id",
            match: { project_id: projectId },
          })
          .then((stories) => stories.filter((story) => story.sprint_id).length),
        tasks: taskStats,
        meetings: meetingStats,
        reports: reportStats,
        journalEntries: journalEntries.length,
      },
    });
  } catch (err) {
    next(err);
  }
};
