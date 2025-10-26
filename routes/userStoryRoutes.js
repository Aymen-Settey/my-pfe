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
router.post("/", authorizeRoles("student"), validateUserStory, createUserStory);

// Get all user stories (accessible by students, supervisors, and admins)
router.get(
  "/",
  authorizeRoles(
    "student",
    "academic_supervisor",
    "company_supervisor",
    "admin"
  ),
  getUserStories
);

// Get user story by ID (accessible by students, supervisors, and admins)
router.get(
  "/:userStoryId",
  validateUserStoryId,
  authorizeRoles(
    "student",
    "academic_supervisor",
    "company_supervisor",
    "admin"
  ),
  getUserStoryById
);

// Update user story (only students can update user stories)
router.put(
  "/:userStoryId",
  authorizeRoles("student"),
  validateUserStoryId,
  validateUserStoryUpdate,
  updateUserStory
);

// Delete user story (only students can delete user stories)
router.delete(
  "/:userStoryId",
  authorizeRoles("student"),
  validateUserStoryId,
  deleteUserStory
);

// Nested routes
router.use("/:userStoryId/tasks", taskRoutes);

module.exports = router;
