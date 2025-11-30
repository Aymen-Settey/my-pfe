const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createUserStory,
  getUserStories,
  getUserStoryById,
  updateUserStory,
  deleteUserStory,
} = require("../controllers/userStoryController");
const taskRoutes = require("./taskRoutes");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateUserStory,
  validateUserStoryUpdate,
  validateUserStoryId,
} = require("../validators");

// All routes require authentication
router.use(protect);

// Create user story (only students can create user stories)
router.post(
  "/",
  authorizeRoles("ETUDIANT"),
  validateUserStory,
  createUserStory
);

// Get all user stories (accessible by students, supervisors)
router.get(
  "/",
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getUserStories
);

// Get user story by ID (accessible by students, supervisors)
router.get(
  "/:userStoryId",
  validateUserStoryId,
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getUserStoryById
);

// Update user story (only students can update user stories)
router.put(
  "/:userStoryId",
  authorizeRoles("ETUDIANT"),
  validateUserStoryId,
  validateUserStoryUpdate,
  updateUserStory
);

// Delete user story (only students can delete user stories)
router.delete(
  "/:userStoryId",
  authorizeRoles("ETUDIANT"),
  validateUserStoryId,
  deleteUserStory
);

// Nested routes
router.use("/:userStoryId/tasks", taskRoutes);

module.exports = router;
