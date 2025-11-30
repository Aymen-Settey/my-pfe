const Report = require("../models/Report");

exports.uploadReport = async (req, res, next) => {
  try {
    const { urlFichier, version } = req.body;
    const { meetingId } = req.params;

    const report = new Report({
      meeting_id: meetingId,
      urlFichier,
      version,
    });

    await report.save();
    res.status(201).json({
      success: true,
      message: "Report version uploaded successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    const reports = await Report.find({ meeting_id: meetingId });

    if (reports.length === 0) {
      const err = new Error("No report versions found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report versions fetched successfully",
      model: reports,
    });
  } catch (err) {
    next(err);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const { meetingId, reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
      meeting_id: meetingId,
    });

    if (!report) {
      const err = new Error("Report version not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report version fetched successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateReport = async (req, res, next) => {
  try {
    const { meetingId, reportId } = req.params;
    const { urlFichier, version } = req.body;

    const report = await Report.findOneAndUpdate(
      { _id: reportId, meeting_id: meetingId },
      { urlFichier, version },
      { new: true, runValidators: true }
    );

    if (!report) {
      const err = new Error("Report version not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report version updated successfully",
      model: report,
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadReport = async (req, res, next) => {
  try {
    const { meetingId, reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
      meeting_id: meetingId,
    });

    if (!report) {
      const err = new Error("Report version not found");
      err.status = 404;
      throw err;
    }

    // For now, we assume urlFichier is a direct link or path
    res.status(200).json({
      success: true,
      message: "Download URL retrieved successfully",
      model: { download_url: report.urlFichier },
    });
  } catch (err) {
    next(err);
  }
};

exports.reviewReport = async (req, res, next) => {
  try {
    const { meetingId, reportId } = req.params;
    const { estValide, commentaire } = req.body;

    const report = await Report.findOne({
      _id: reportId,
      meeting_id: meetingId,
    });

    if (!report) {
      const err = new Error("Report version not found");
      err.status = 404;
      throw err;
    }

    // Create validation for report (which is linked to meeting)
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
      message: "Report reviewed successfully",
      model: validation,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const { meetingId, reportId } = req.params;
    const result = await Report.deleteOne({
      _id: reportId,
      meeting_id: meetingId,
    });

    if (result.deletedCount === 0) {
      const err = new Error("Report version not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Report version deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
