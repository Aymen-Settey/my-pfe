const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createJournalEntry,
  getJournalEntry,
} = require("../controllers/journalController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, authorizeRoles("student"), createJournalEntry);
router.get(
  "/",
  protect,
  authorizeRoles("student", "supervisor_company", "supervisor_academic"),
  getJournalEntry
);

module.exports = router;
