// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userStory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserStory",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "standby", "done"],
      default: "todo",
    },
    history: [
      {
        status: String,
        changedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
