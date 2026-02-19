import jwt from 'jsonwebtoken';

export const signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });

export const signEmailVerificationToken = (payload) =>
  jwt.sign(payload, process.env.JWT_EMAIL_VERIFY_SECRET, { expiresIn: process.env.JWT_EMAIL_VERIFY_EXPIRES });

export const signPasswordResetToken = (payload) =>
  jwt.sign(payload, process.env.JWT_RESET_SECRET, { expiresIn: process.env.JWT_RESET_EXPIRES });

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export const verifyEmailToken = (token) =>
  jwt.verify(token, process.env.JWT_EMAIL_VERIFY_SECRET);

export const verifyResetToken = (token) =>
  jwt.verify(token, process.env.JWT_RESET_SECRET);
