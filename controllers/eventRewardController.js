const mongoose = require("mongoose");
const { Event } = require("../models/other");
const EventAttendance = require("../models/EventAttendance");
const { signQrToken, verifyQrToken } = require("../utils/qrToken");
const User = require("../models/User");

// register for event
const registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const existing = await EventAttendance.findOne({ userId, eventId });
    if (existing) {
      return res.status(409).json({ error: "Already registered" });
    }

    // reg off with event
    const now = new Date();

    const eventEnd = new Date(
      `${event.date} ${event.timing?.split("-")[1] || "23:59"}`,
    );

    if (now > eventEnd) {
      return res.status(400).json({
        error: "Registration closed. Event already ended.",
      });
    }

    const rewardTokens = Number(event.rewardTokens || 0);

    const attendance = await EventAttendance.create({
      userId,
      eventId,
      rewardTokens,
      qrToken: "TEMP",
      status: "REGISTERED",
    });

    // qr expire with event
    const expiresInSeconds = Math.floor(
      (eventEnd.getTime() - Date.now()) / 1000,
    );

    if (expiresInSeconds <= 0) {
      return res.status(400).json({
        error: "Event already ended",
      });
    }

    const qrToken = signQrToken(
      {
        attendanceId: attendance._id.toString(),
        userId,
        eventId,
      },
      expiresInSeconds,
    );
    attendance.qrToken = qrToken;
    await attendance.save();

    return res.status(201).json({
      success: true,
      qrToken,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// get user's events
const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await EventAttendance.find({ userId }).populate("eventId");

    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// verifying attendance
const verifyAttendance = async (req, res) => {
  try {
    const { qrToken } = req.body;

    if (!qrToken) {
      return res.status(400).json({ error: "QR token required" });
    }

    let decoded;
    try {
      decoded = verifyQrToken(qrToken);
    } catch (err) {
      console.log("QR VERIFY ERROR:", err.message);
      return res.status(401).json({
        error: "Invalid or expired QR token",
      });
    }

    const { attendanceId, userId, eventId } = decoded;

    const attendance = await EventAttendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    if (attendance.qrUsed) {
      return res.status(409).json({ error: "QR already used" });
    }

    if (
      attendance.userId.toString() !== userId ||
      attendance.eventId.toString() !== eventId
    ) {
      return res.status(403).json({ error: "QR mismatch" });
    }

    const user = await User.findById(attendance.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profile.nsdccoins += attendance.rewardTokens;

    attendance.qrUsed = true;
    attendance.status = "REWARDED";
    attendance.attendedAt = new Date();
    attendance.rewardedAt = new Date();
    attendance.verifiedBy = req.user.id;

    await Promise.all([user.save(), attendance.save()]);

    return res.status(200).json({
      success: true,
      message: "Attendance verified and reward credited",
    });
  } catch (err) {
    console.error("Verify attendance error:", err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = {
  registerForEvent,
  getMyEvents,
  verifyAttendance,
};
