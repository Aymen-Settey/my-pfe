const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createJournalEntry,
  getJournalEntry,
} = require("../controllers/journalController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, authorizeRoles("ETUDIANT"), createJournalEntry);
router.get(
  "/",
  protect,
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  getJournalEntry
);

module.exports = router;
