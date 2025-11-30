// models/Sprint.js
const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    numero: { type: Number, required: true },
    nom: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: {
      type: String,
      enum: ["Planifie", "EnCours", "Termine"],
      default: "Planifie",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sprint", sprintSchema);
