const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createMeeting,
  getMeetings,
  validateMeeting,
} = require("../controllers/meetingController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, authorizeRoles("student"), createMeeting);
router.get(
  "/",
  protect,
  authorizeRoles("supervisor_company", "supervisor_academic"),
  getMeetings
);
router.put(
  "/:meetingId/validate",
  protect,
  authorizeRoles("supervisor_academic"),
  validateMeeting
);
module.exports = router;
