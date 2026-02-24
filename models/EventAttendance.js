const mongoose = require("mongoose");

const eventAttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    rewardTokens: {
      type: Number,
      required: true,
    },

    qrToken: {
      type: String,
      required: true,
    },

    // QR / verification state
    status: {
      type: String,
      enum: ["REGISTERED", "ATTENDED", "REWARDED"],
      default: "REGISTERED",
      index: true,
    },

    qrUsed: {
      type: Boolean,
      default: false,
    },

    qrUsedAt: {
      type: Date,
      default: null,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    attendedAt: {
      type: Date,
      default: null,
    },

    rewardedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Prevent duplicate registrations
eventAttendanceSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("EventAttendance", eventAttendanceSchema);