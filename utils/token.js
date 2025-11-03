const jwt = require('jsonwebtoken');

const signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });

const signRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });

const signEmailVerificationToken = (payload) =>
  jwt.sign(payload, process.env.JWT_EMAIL_VERIFY_SECRET, { expiresIn: process.env.JWT_EMAIL_VERIFY_EXPIRES });

const signPasswordResetToken = (payload) =>
  jwt.sign(payload, process.env.JWT_RESET_SECRET, { expiresIn: process.env.JWT_RESET_EXPIRES });

const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

const verifyEmailToken = (token) =>
  jwt.verify(token, process.env.JWT_EMAIL_VERIFY_SECRET);

const verifyResetToken = (token) =>
  jwt.verify(token, process.env.JWT_RESET_SECRET);

module.exports = {
  signAccessToken,
  signRefreshToken,
  signEmailVerificationToken,
  signPasswordResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyEmailToken,
  verifyResetToken,
};
