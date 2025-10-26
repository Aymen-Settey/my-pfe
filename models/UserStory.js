// models/UserStory.js
const mongoose = require("mongoose");

const userStorySchema = new mongoose.Schema(
  {
    sprint_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserStory", userStorySchema);
