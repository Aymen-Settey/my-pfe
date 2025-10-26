// models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    version: { type: String, required: true },
    date: { type: Date, required: true },
    notes: String,
    file_url: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft",
    },
    submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
