const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res, next) => {
  try {
    const { datePlanification, ordreDuJour, compteRendu, statut } = req.body;
    const { projectId } = req.params;
    const plannerId = req.user.id;

    // Verify user is ENCADRANT_UNIVERSITAIRE
    const User = require("../models/User");
    const planner = await User.findById(plannerId);
    if (!planner || planner.role !== "ENCADRANT_UNIVERSITAIRE") {
      const err = new Error("Only academic supervisors can plan meetings");
      err.status = 403;
      throw err;
    }

    const meeting = new Meeting({
      project_id: projectId,
      datePlanification,
      ordreDuJour,
      compteRendu,
      statut: statut || "Planifiee",
      planner_id: plannerId,
    });

    await meeting.save();
    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      model: meeting,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const meetings = await Meeting.find({ project_id: projectId }).populate(
      "planner_id"
    );
    res.status(200).json({
      success: true,
      message: "Meetings fetched successfully",
      model: meetings,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMeetingById = async (req, res, next) => {
  try {
    const { projectId, meetingId } = req.params;
    const meeting = await Meeting.findOne({
      _id: meetingId,
      project_id: projectId,
    }).populate("planner_id");

    if (!meeting) {
      const err = new Error("Meeting not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Meeting fetched successfully",
      model: meeting,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMeeting = async (req, res, next) => {
  try {
    const { projectId, meetingId } = req.params;
    const { datePlanification, ordreDuJour, compteRendu, statut } = req.body;

    const meeting = await Meeting.findOneAndUpdate(
      { _id: meetingId, project_id: projectId },
      { datePlanification, ordreDuJour, compteRendu, statut },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      const err = new Error("Meeting not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      model: meeting,
    });
  } catch (err) {
    next(err);
  }
};

exports.validateMeeting = async (req, res, next) => {
  try {
    const { projectId, meetingId } = req.params;
    const { estValide, commentaire } = req.body;

    const meeting = await Meeting.findOne({
      _id: meetingId,
      project_id: projectId,
    });

    if (!meeting) {
      const err = new Error("Meeting not found");
      err.status = 404;
      throw err;
    }

    // Create validation for meeting content
    const Validation = require("../models/Validation");
    const validation = new Validation({
      meeting_id: meetingId,
      validated_by: req.user.id,
      estValide,
      commentaire,
      typeValidation: "ContenuReunion",
    });

    await validation.save();
    res.status(200).json({
      success: true,
      message: "Meeting content validated successfully",
      model: validation,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMeeting = async (req, res, next) => {
  try {
    const { projectId, meetingId } = req.params;
    const result = await Meeting.deleteOne({
      _id: meetingId,
      project_id: projectId,
    });

    if (result.deletedCount === 0) {
      const err = new Error("Meeting not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
