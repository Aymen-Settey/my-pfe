const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  validateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateMeeting: validateMeetingData,
  validateMeetingUpdate,
  validateMeetingValidation,
  validateMeetingId,
} = require("../validators");
const reportRoutes = require("./reportRoutes");
const validationRoutes = require("./validationRoutes");

router.use(protect);

// Create meeting (only academic supervisors can plan meetings)
router.post(
  "/",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE"),
  validateMeetingData,
  createMeeting
);

// Get all meetings
router.get(
  "/",
  authorizeRoles("ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE", "ETUDIANT"),
  getMeetings
);

// Get meeting by ID
router.get(
  "/:meetingId",
  authorizeRoles("ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE", "ETUDIANT"),
  validateMeetingId,
  getMeetingById
);

// Update meeting
router.put(
  "/:meetingId",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE"),
  validateMeetingId,
  validateMeetingUpdate,
  updateMeeting
);

// Validate meeting content
router.put(
  "/:meetingId/validate",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateMeetingId,
  validateMeetingValidation,
  validateMeeting
);

// Delete meeting
router.delete(
  "/:meetingId",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE"),
  validateMeetingId,
  deleteMeeting
);

// Nested routes - reports are now under meetings
router.use("/:meetingId/reports", reportRoutes);

// Nested routes - validations for meeting content
router.use("/:meetingId/validations", validationRoutes);

module.exports = router;
