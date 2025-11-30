const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getStudentDashboard,
  getSupervisorDashboard,
  getProjectProgress,
} = require("../controllers/dashboardController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get(
  "/student",
  protect,
  authorizeRoles("ETUDIANT"),
  getStudentDashboard
);
router.get(
  "/supervisor",
  protect,
  authorizeRoles("ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  getSupervisorDashboard
);
router.get(
  "/progress",
  protect,
  authorizeRoles("ETUDIANT"),
  getProjectProgress
);

module.exports = router;
