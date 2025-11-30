const UserStory = require("../models/UserStory");

exports.createUserStory = async (req, res, next) => {
  try {
    const { titre, description, priorite, acceptation } = req.body;
    const { sprintId } = req.params;

    const userStory = new UserStory({
      sprint_id: sprintId,
      titre,
      description,
      priorite: priorite || "Moyenne",
      acceptation,
    });

    await userStory.save();
    res.status(201).json({
      success: true,
      message: "User story created successfully",
      model: userStory,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserStories = async (req, res, next) => {
  try {
    const { sprintId } = req.params;
    const stories = await UserStory.find({ sprint_id: sprintId });
    res.status(200).json({
      success: true,
      message: "User stories fetched successfully",
      model: stories,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserStoryById = async (req, res, next) => {
  try {
    const { sprintId, userStoryId } = req.params;
    const story = await UserStory.findOne({
      _id: userStoryId,
      sprint_id: sprintId,
    });
    if (!story) {
      const err = new Error("User story not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "User story fetched successfully",
      model: story,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserStory = async (req, res, next) => {
  try {
    const { sprintId, userStoryId } = req.params;
    const { titre, description, priorite, acceptation } = req.body;

    const story = await UserStory.findOneAndUpdate(
      { _id: userStoryId, sprint_id: sprintId },
      { titre, description, priorite, acceptation },
      { new: true, runValidators: true }
    );

    if (!story) {
      const err = new Error("User story not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "User story updated successfully",
      model: story,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUserStory = async (req, res, next) => {
  try {
    const { sprintId, userStoryId } = req.params;
    const result = await UserStory.deleteOne({
      _id: userStoryId,
      sprint_id: sprintId,
    });
    if (result.deletedCount === 0) {
      const err = new Error("User story not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "User story deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
