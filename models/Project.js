// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    description: String,
    academic_supervisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_supervisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: {
      type: String,
      enum: ["Actif", "Terminee", "Suspendu"],
      default: "Actif",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
