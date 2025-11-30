const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createValidation,
  getValidations,
  getValidationById,
  updateValidation,
  deleteValidation,
} = require("../controllers/validationController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  validateValidation,
  validateValidationUpdate,
  validateValidationId,
} = require("../validators");

router.use(protect);

// Create validation (supervisors can validate tasks or meeting content)
router.post(
  "/",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateValidation,
  createValidation
);

// Get all validations (filtered by taskId or meetingId query params)
router.get(
  "/",
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  getValidations
);

// Get validation by ID
router.get(
  "/:validationId",
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  validateValidationId,
  getValidationById
);

// Update validation
router.put(
  "/:validationId",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateValidationId,
  validateValidationUpdate,
  updateValidation
);

// Delete validation
router.delete(
  "/:validationId",
  authorizeRoles("ENCADRANT_UNIVERSITAIRE", "ENCADRANT_ENTREPRISE"),
  validateValidationId,
  deleteValidation
);

module.exports = router;
