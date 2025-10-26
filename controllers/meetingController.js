const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res) => {
  try {
    const { title, date, duration, participants, link, status, description } =
      req.body;
    const { projectId } = req.params;

    if (new Date(date) < new Date()) {
      return res
        .status(400)
        .json({ message: "Meeting date cannot be in the past" });
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
    res.status(201).json(meeting);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating meeting", error: err.message });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const { projectId } = req.params;
    const meetings = await Meeting.find({ project_id: projectId }).populate(
      "participants"
    );
    res.status(200).json(meetings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching meetings", error: err.message });
  }
};

exports.validateMeeting = async (req, res) => {
  try {
    const { projectId, meetingId } = req.params;
    const { status } = req.body;

    const meeting = await Meeting.findOne({
      _id: meetingId,
      project_id: projectId,
    });
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    if (meeting.validated)
      return res.status(400).json({ message: "Meeting already validated" });

    meeting.validated = true;
    meeting.status = status || "completed";
    meeting.validated_by = req.user.id;

    await meeting.save();
    res.status(200).json(meeting);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error validating meeting", error: err.message });
  }
};
