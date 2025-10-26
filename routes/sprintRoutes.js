const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createSprint,
  getSprints,
  getSprintById,
  updateSprint,
} = require("../controllers/sprintController");
const userStoryRoutes = require("./userStoryRoutes");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateSprint,
  validateSprintUpdate,
  validateSprintId,
} = require("../validators");

// All routes require authentication
router.use(protect);

// Create sprint (only students can create sprints)
router.post("/", authorizeRoles("student"), validateSprint, createSprint);

// Get all sprints (accessible by students, supervisors, and admins)
router.get(
  "/",
  authorizeRoles(
    "student",
    "academic_supervisor",
    "company_supervisor",
    "admin"
  ),
  getSprints
);

// Get sprint by ID (accessible by students, supervisors, and admins)
router.get(
  "/:sprintId",
  validateSprintId,
  authorizeRoles(
    "student",
    "academic_supervisor",
    "company_supervisor",
    "admin"
  ),
  getSprintById
);

// Update sprint (only students can update sprints)
router.put(
  "/:sprintId",
  authorizeRoles("student"),
  validateSprintId,
  validateSprintUpdate,
  updateSprint
);

// Nested routes
router.use("/:sprintId/userStories", userStoryRoutes);

module.exports = router;
