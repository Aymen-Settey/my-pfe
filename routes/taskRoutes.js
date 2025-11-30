const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateTask,
  validateTaskUpdate,
  validateTaskStatusUpdate,
  validateTaskId,
} = require("../validators");
const validationRoutes = require("./validationRoutes");

// All routes require authentication
router.use(protect);

// Create task (only students can create tasks)
router.post("/", authorizeRoles("ETUDIANT"), validateTask, createTask);

// Update task status (only students can update task status)
router.patch(
  "/:taskId/status",
  authorizeRoles("ETUDIANT"),
  validateTaskId,
  validateTaskStatusUpdate,
  updateTaskStatus
);

// Update task (only students can update tasks)
router.put(
  "/:taskId",
  authorizeRoles("ETUDIANT"),
  validateTaskId,
  validateTaskUpdate,
  updateTask
);

// Delete task (only students can delete tasks)
router.delete(
  "/:taskId",
  authorizeRoles("ETUDIANT"),
  validateTaskId,
  deleteTask
);

// Nested routes - validations for tasks
router.use("/:taskId/validations", validationRoutes);

module.exports = router;
