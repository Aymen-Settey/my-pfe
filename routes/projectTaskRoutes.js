const express = require("express");
const router = express.Router({ mergeParams: true });
const { getProjectTasks } = require("../controllers/taskController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get(
  "/",
  protect,
  authorizeRoles("ETUDIANT", "ENCADRANT_ENTREPRISE", "ENCADRANT_UNIVERSITAIRE"),
  getProjectTasks
);

module.exports = router;
