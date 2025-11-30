// models/Meeting.js
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    datePlanification: { type: Date, required: true },
    ordreDuJour: String,
    compteRendu: String,
    statut: {
      type: String,
      enum: ["Planifiee", "Effectuee", "Annulee"],
      default: "Planifiee",
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
    planner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);
