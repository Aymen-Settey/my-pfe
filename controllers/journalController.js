const Journal = require("../models/Journal");

exports.createJournalEntry = async (req, res) => {
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
    res.status(201).json(journal);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating journal entry", error: err.message });
  }
};

exports.getJournalEntry = async (req, res) => {
  try {
    const { projectId } = req.params;
    const journal = await Journal.find({ project_id: projectId });

    if (!journal || journal.length === 0) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json(journal);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching journal", error: err.message });
  }
};
