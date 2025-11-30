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
router.post("/", authorizeRoles("ETUDIANT"), validateSprint, createSprint);

// Get all sprints (accessible by students, supervisors)
router.get(
  "/",
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getSprints
);

// Get sprint by ID (accessible by students, supervisors)
router.get(
  "/:sprintId",
  validateSprintId,
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getSprintById
);

// Update sprint (only students can update sprints)
router.put(
  "/:sprintId",
  authorizeRoles("ETUDIANT"),
  validateSprintId,
  validateSprintUpdate,
  updateSprint
);

// Nested routes
router.use("/:sprintId/userStories", userStoryRoutes);

module.exports = router;
