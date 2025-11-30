// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userStory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserStory",
      required: true,
    },
    titre: { type: String, required: true },
    description: String,
    statut: {
      type: String,
      enum: ["ToDo", "InProgress", "Standby", "Done"],
      default: "ToDo",
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
    dateModification: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update dateModification on save
taskSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.dateModification = new Date();
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
