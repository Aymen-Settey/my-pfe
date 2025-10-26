// models/Validation.js
const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    validated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    comment: String,
    meeting_id: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }, // optional
    status: {
      type: String,
      enum: ["validated", "invalidated"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Validation", validationSchema);
