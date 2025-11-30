// models/UserStory.js
const mongoose = require("mongoose");

const userStorySchema = new mongoose.Schema(
  {
    sprint_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },
    titre: { type: String, required: true },
    description: String,
    priorite: {
      type: String,
      enum: ["Haute", "Moyenne", "Basse"],
      default: "Moyenne",
    },
    acceptation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserStory", userStorySchema);
