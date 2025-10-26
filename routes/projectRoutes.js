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

// All routes require authentication
router.use(protect);

// Create project (only students can create projects)
router.post("/", authorizeRoles("student"), validateProject, createProject);

// Get all projects (accessible by supervisors and admins)
router.get(
  "/",
  authorizeRoles("academic_supervisor", "company_supervisor", "admin"),
  getProjects
);

// Get project by ID (accessible by students, supervisors, and admins)
router.get(
  "/:id",
  validateId,
  authorizeRoles(
    "student",
    "academic_supervisor",
    "company_supervisor",
    "admin"
  ),
  getProjectById
);

// Update project (only students can update their own projects)
router.put(
  "/:id",
  authorizeRoles("student"),
  validateId,
  validateProjectUpdate,
  updateProject
);

// Delete project (only admins can delete projects)
router.delete("/:id", authorizeRoles("admin"), validateId, deleteProject);

// Nested routes
router.use("/:projectId/sprints", sprintRoutes);
router.use("/:projectId/tasks", projectTaskRoutes);
router.use("/:projectId/meetings", meetingRoutes);
router.use("/:projectId/reports", reportRoutes);
router.use("/:projectId/internship-journal", journalRoutes);
router.use("/:projectId/dashboard", dashboardRoutes);

module.exports = router;
