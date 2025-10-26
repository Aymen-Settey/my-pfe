const Report = require("../models/Report");

exports.uploadReport = async (req, res) => {
  try {
    const { version, date, notes, file_url } = req.body;
    const { projectId } = req.params;

    const report = new Report({
      project_id: projectId,
      version,
      date,
      notes,
      file_url,
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error uploading report", error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { projectId } = req.params;
    const reports = await Report.find({ project_id: projectId });
    if (reports.length === 0)
      return res.status(404).json({ message: "No reports found" });
    res.status(200).json(reports);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: err.message });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const { projectId, reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
      project_id: projectId,
    });
    if (!report) return res.status(404).json({ message: "Report not found" });

    // For now, we assume file_url is a direct link or path
    res.status(200).json({ download_url: report.file_url });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error downloading report", error: err.message });
  }
};
