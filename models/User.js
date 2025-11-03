const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String }, // latest active refresh token
    lastLoginAt: { type: Date },
    profile: {
      name: { type: String },
      avatarUrl: { type: String },
      bio: { type: String },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
