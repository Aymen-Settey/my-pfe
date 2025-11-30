const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  uploadReport,
  getReports,
  getReportById,
  updateReport,
  downloadReport,
  reviewReport,
  deleteReport,
} = require("../controllers/reportController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateReport,
  validateReportUpdate,
  validateReportId,
} = require("../validators");

router.use(protect);

router.post(
  "/",
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE"),
  validateReport,
  uploadReport
);
router.get(
  "/",
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  getReports
);
router.get(
  "/:reportId",
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  validateReportId,
  getReportById
);
router.put(
  "/:reportId",
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE"),
  validateReportId,
  validateReportUpdate,
  updateReport
);
router.get(
  "/:reportId/download",
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  validateReportId,
  downloadReport
);
router.put(
  "/:reportId/review",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateReportId,
  reviewReport
);
router.delete(
  "/:reportId",
  authorizeRoles("ETUDIANT", "ENCADRANT_UNIVERSITAIRE"),
  validateReportId,
  deleteReport
);

module.exports = router;
