// models/Report.js (VersionRapport)
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    meeting_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    urlFichier: { type: String, required: true },
    version: { type: Number, required: true },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
