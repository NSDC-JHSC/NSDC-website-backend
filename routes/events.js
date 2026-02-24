const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const requireRoles = require("../middleware/roles");

const {
  registerForEvent,
  getMyEvents,
  verifyAttendance,
} = require("../controllers/eventRewardController");

// user registers for event
router.post("/:eventId/register", auth, registerForEvent);

// Get logged-in user's registered events
router.get("/my-events", auth, getMyEvents);

//admin verify attendance
router.post(
  "/verify-attendance",
  auth,
  requireRoles(["admin"]),
  verifyAttendance,
);

module.exports = router;
