const Report = require("../models/Report");

exports.uploadReport = async (req, res, next) => {
  try {
    const { version, date, notes, file_url, status } = req.body;
    const { projectId } = req.params;

    const report = new Report({
      project_id: projectId,
      version,
      date,
      notes,
      file_url,
      status,
      submitted_by: req.user.id,
    });

    await report.save();
    res.status(201).json({
      success: true,
      message: "Report uploaded successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const reports = await Report.find({ project_id: projectId });

    if (reports.length === 0) {
      const err = new Error("No reports found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      model: reports,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const { projectId, reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
      project_id: projectId,
    });

    if (!report) {
      const err = new Error("Report not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateReport = async (req, res, next) => {
  try {
    const { projectId, reportId } = req.params;
    const { version, date, notes, file_url, status } = req.body;

    const report = await Report.findOneAndUpdate(
      { _id: reportId, project_id: projectId },
      { version, date, notes, file_url, status },
      { new: true, runValidators: true }
    );

    if (!report) {
      const err = new Error("Report not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadReport = async (req, res, next) => {
  try {
    const { projectId, reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
      project_id: projectId,
    });

    if (!report) {
      const err = new Error("Report not found");
      err.status = 404;
      throw err;
    }

    // For now, we assume file_url is a direct link or path
    res.status(200).json({
      success: true,
      message: "Download URL retrieved successfully",
      model: { download_url: report.file_url },
    });
  } catch (err) {
    next(err);
  }
};

exports.reviewReport = async (req, res, next) => {
  try {
    const { projectId, reportId } = req.params;
    const { status, notes } = req.body;

    const report = await Report.findOne({
      _id: reportId,
      project_id: projectId,
    });

    if (!report) {
      const err = new Error("Report not found");
      err.status = 404;
      throw err;
    }

    report.status = status;
    report.notes = notes || report.notes;
    report.reviewed_by = req.user.id;

    await report.save();
    res.status(200).json({
      success: true,
      message: "Report reviewed successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const { projectId, reportId } = req.params;
    const result = await Report.deleteOne({
      _id: reportId,
      project_id: projectId,
    });

    if (result.deletedCount === 0) {
      const err = new Error("Report not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
