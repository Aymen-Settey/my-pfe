const Validation = require("../models/Validation");

exports.createValidation = async (req, res, next) => {
  try {
    const { taskId, meetingId, estValide, commentaire } = req.body;

    // Validate that either taskId or meetingId is provided (exclusive OR)
    if (!taskId && !meetingId) {
      const err = new Error("Either taskId or meetingId must be provided");
      err.status = 400;
      throw err;
    }

    if (taskId && meetingId) {
      const err = new Error(
        "Cannot provide both taskId and meetingId (exclusive OR constraint)"
      );
      err.status = 400;
      throw err;
    }

    const validation = new Validation({
      task_id: taskId,
      meeting_id: meetingId,
      validated_by: req.user.id,
      estValide,
      commentaire,
    });

    await validation.save();
    res.status(201).json({
      success: true,
      message: "Validation created successfully",
      model: validation,
    });
  } catch (err) {
    next(err);
  }
};

exports.getValidations = async (req, res, next) => {
  try {
    // Get taskId or meetingId from route params (if nested) or query params
    const taskId = req.params.taskId || req.query.taskId;
    const meetingId = req.params.meetingId || req.query.meetingId;
    let query = {};

    if (taskId) {
      query.task_id = taskId;
    } else if (meetingId) {
      query.meeting_id = meetingId;
    }

    const validations = await Validation.find(query)
      .populate("validated_by", "nom email")
      .populate("task_id", "titre")
      .populate("meeting_id", "datePlanification");

    res.status(200).json({
      success: true,
      message: "Validations fetched successfully",
      model: validations,
    });
  } catch (err) {
    next(err);
  }
};

exports.getValidationById = async (req, res, next) => {
  try {
    const { validationId } = req.params;
    const validation = await Validation.findById(validationId)
      .populate("validated_by", "nom email")
      .populate("task_id", "titre")
      .populate("meeting_id", "datePlanification");

    if (!validation) {
      const err = new Error("Validation not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Validation fetched successfully",
      model: validation,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateValidation = async (req, res, next) => {
  try {
    const { validationId } = req.params;
    const { estValide, commentaire } = req.body;

    const validation = await Validation.findByIdAndUpdate(
      validationId,
      { estValide, commentaire },
      { new: true, runValidators: true }
    );

    if (!validation) {
      const err = new Error("Validation not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Validation updated successfully",
      model: validation,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteValidation = async (req, res, next) => {
  try {
    const { validationId } = req.params;
    const result = await Validation.deleteOne({ _id: validationId });

    if (result.deletedCount === 0) {
      const err = new Error("Validation not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Validation deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
