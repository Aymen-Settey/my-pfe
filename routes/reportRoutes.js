const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  uploadReport,
  getReports,
  downloadReport,
} = require("../controllers/reportController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, authorizeRoles("student"), uploadReport);
router.get(
  "/",
  protect,
  authorizeRoles("student", "supervisor_company", "supervisor_academic"),
  getReports
);
router.get(
  "/:reportId/download",
  protect,
  authorizeRoles("student", "supervisor_company", "supervisor_academic"),
  downloadReport
);

module.exports = router;
