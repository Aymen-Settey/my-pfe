const Journal = require("../models/Journal");

exports.createJournalEntry = async (req, res, next) => {
  try {
    const { date, activities, skills, difficulties, solutions } = req.body;
    const { projectId } = req.params;

    const journal = new Journal({
      project_id: projectId,
      date,
      activities,
      skills,
      difficulties,
      solutions,
    });

    await journal.save();
    res.status(201).json({
      success: true,
      message: "Journal entry created successfully",
      model: journal,
    });
  } catch (err) {
    next(err);
  }
};

exports.getJournalEntry = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const journal = await Journal.find({ project_id: projectId });

    if (!journal || journal.length === 0) {
      const err = new Error("Journal not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Journal entries fetched successfully",
      model: journal,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateJournalEntry = async (req, res, next) => {
  try {
    const { projectId, journalId } = req.params;
    const { date, activities, skills, difficulties, solutions } = req.body;

    const journal = await Journal.findOneAndUpdate(
      { _id: journalId, project_id: projectId },
      { date, activities, skills, difficulties, solutions },
      { new: true, runValidators: true }
    );

    if (!journal) {
      const err = new Error("Journal entry not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Journal entry updated successfully",
      model: journal,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteJournalEntry = async (req, res, next) => {
  try {
    const { projectId, journalId } = req.params;
    const result = await Journal.deleteOne({
      _id: journalId,
      project_id: projectId,
    });

    if (result.deletedCount === 0) {
      const err = new Error("Journal entry not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
