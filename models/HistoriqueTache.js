// models/HistoriqueTache.js
const mongoose = require("mongoose");

const historiqueTacheSchema = new mongoose.Schema(
  {
    tache_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    ancienStatut: {
      type: String,
      enum: ["ToDo", "InProgress", "Standby", "Done"],
      required: true,
    },
    nouveauStatut: {
      type: String,
      enum: ["ToDo", "InProgress", "Standby", "Done"],
      required: true,
    },
    dateChangement: {
      type: Date,
      default: Date.now,
    },
    auteur: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HistoriqueTache", historiqueTacheSchema);
