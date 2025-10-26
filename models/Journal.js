// models/Journal.js
const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    date: { type: Date, required: true },
    activities: String,
    skills: String,
    difficulties: String,
    solutions: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journal", journalSchema);
