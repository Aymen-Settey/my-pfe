// models/Validation.js
const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
    },
    meeting_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: false,
    },
    validated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    estValide: {
      type: Boolean,
      required: true,
    },
    commentaire: String,
    dateValidation: {
      type: Date,
      default: Date.now,
    },
    typeValidation: {
      type: String,
      enum: ["Tache", "ContenuReunion"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validation: Exclusive OR constraint - either task_id or meeting_id must be set, but not both
validationSchema.pre("validate", function (next) {
  const hasTask = !!this.task_id;
  const hasMeeting = !!this.meeting_id;

  if (!hasTask && !hasMeeting) {
    const err = new Error("Either task_id or meeting_id must be provided");
    return next(err);
  }

  if (hasTask && hasMeeting) {
    const err = new Error(
      "Cannot have both task_id and meeting_id (exclusive OR constraint)"
    );
    return next(err);
  }

  // Set typeValidation based on which ID is provided
  if (hasTask) {
    this.typeValidation = "Tache";
  } else if (hasMeeting) {
    this.typeValidation = "ContenuReunion";
  }

  next();
});

module.exports = mongoose.model("Validation", validationSchema);
