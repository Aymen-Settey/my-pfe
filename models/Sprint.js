// models/Sprint.js
const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },
    goal: String,
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["planning", "active", "completed"],
      default: "planning",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sprint", sprintSchema);
