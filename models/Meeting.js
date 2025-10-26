// models/Meeting.js
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    duration: Number,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    link: String,
    status: {
      type: String,
      enum: ["planned", "completed"],
      default: "planned",
    },
    description: String,
    validated: { type: Boolean, default: false },
    validated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);
