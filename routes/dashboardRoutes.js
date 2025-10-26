const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getStudentDashboard,
  getSupervisorDashboard,
  getProjectProgress,
} = require("../controllers/dashboardController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/student", protect, authorizeRoles("student"), getStudentDashboard);
router.get(
  "/supervisor",
  protect,
  authorizeRoles("supervisor_company", "supervisor_academic"),
  getSupervisorDashboard
);
router.get("/progress", protect, authorizeRoles("student"), getProjectProgress);

module.exports = router;
