const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res, next) => {
  try {
    const { title, date, duration, participants, link, status, description } =
      req.body;
    const { projectId } = req.params;

    // Check if meeting date is in the past
    if (new Date(date) < new Date()) {
      const err = new Error("Meeting date cannot be in the past");
      err.status = 400;
      throw err;
    }

    const meeting = new Meeting({
      project_id: projectId,
      title,
      date,
      duration,
      participants,
      link,
      status,
      description,
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
      "participants"
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
    }).populate("participants");

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
    const { title, date, duration, participants, link, status, description } = req.body;

    const meeting = await Meeting.findOneAndUpdate(
      { _id: meetingId, project_id: projectId },
      { title, date, duration, participants, link, status, description },
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
    const { status } = req.body;

    const meeting = await Meeting.findOne({
      _id: meetingId,
      project_id: projectId,
    });
    
    if (!meeting) {
      const err = new Error("Meeting not found");
      err.status = 404;
      throw err;
    }

    if (meeting.validated) {
      const err = new Error("Meeting already validated");
      err.status = 400;
      throw err;
    }

    meeting.validated = true;
    meeting.status = status || "completed";
    meeting.validated_by = req.user.id;

    await meeting.save();
    res.status(200).json({
      success: true,
      message: "Meeting validated successfully",
      model: meeting,
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
