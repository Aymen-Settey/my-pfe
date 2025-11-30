const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateProject,
  validateProjectUpdate,
  validateId,
} = require("../validators");
const sprintRoutes = require("./sprintRoutes");
const projectTaskRoutes = require("./projectTaskRoutes");
const meetingRoutes = require("./meetingRoutes");
const reportRoutes = require("./reportRoutes");
const journalRoutes = require("./journalRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const validationRoutes = require("./validationRoutes");

// All routes require authentication
router.use(protect);

// Create project (only students can create projects)
router.post("/", authorizeRoles("ETUDIANT"), validateProject, createProject);

// Get all projects (accessible by supervisors)
router.get(
  "/",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getProjects
);

// Get project by ID (accessible by students, supervisors)
router.get(
  "/:id",
  validateId,
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  getProjectById
);

// Update project (only students can update their own projects)
router.put(
  "/:id",
  authorizeRoles("ETUDIANT"),
  validateId,
  validateProjectUpdate,
  updateProject
);

// Delete project (only supervisors can delete projects)
router.delete(
  "/:id",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateId,
  deleteProject
);

// Nested routes
router.use("/:projectId/sprints", sprintRoutes);
router.use("/:projectId/tasks", projectTaskRoutes);
router.use("/:projectId/meetings", meetingRoutes);
// Reports are now nested under meetings, not projects
router.use("/:projectId/internship-journal", journalRoutes);
router.use("/:projectId/dashboard", dashboardRoutes);
// General validations route (can filter by taskId or meetingId query params)
router.use("/:projectId/validations", validationRoutes);

module.exports = router;
