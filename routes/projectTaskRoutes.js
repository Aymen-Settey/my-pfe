const express = require("express");
const router = express.Router({ mergeParams: true });
const { getProjectTasks } = require("../controllers/taskController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get(
  "/",
  protect,
  authorizeRoles("student", "supervisor_company", "supervisor_academic"),
  getProjectTasks
);

module.exports = router;
