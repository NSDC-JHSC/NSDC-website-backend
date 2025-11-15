const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  signAccessToken,
  signRefreshToken,
  signEmailVerificationToken,
  signPasswordResetToken,
  verifyRefreshToken,
  verifyEmailToken,
  verifyResetToken,
} = require('../utils/token');
const { sendEmail, verificationEmailTemplate, resetEmailTemplate } = require('../utils/email');
const { registerSchema, loginSchema, requestResetSchema, resetPasswordSchema } = require('../validation/authValidation');

const register = async (req, res) => {
  // console.log(req);
  const { error, value } = registerSchema.validate(req.body);
  console.log(error);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password } = value;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) return res.status(409).json({ error: 'Email already in use' });
  const existingUserName = await User.findOne({ username });
  if (existingUserName) return res.status(409).json({ error: ' username already in use' });

  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hash });

  // Send verification email
  const emailToken = signEmailVerificationToken({ userId: user._id.toString(), email: user.email });
  const verifyLink = `${process.env.CLIENT_BASE_URL}/verify-email?token=${emailToken}`;
  await sendEmail({ to: user.email, subject: 'Verify your email', html: verificationEmailTemplate(verifyLink) });

  res.status(201).json({ message: 'Registered successfully. Please verify your email.', success: true });
};

const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message, success: false });

  const { email, password } = value;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'User not found', success: false });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials', success: false });

  if (!(user.isVerified)) return res.status(401).json({ message: 'Email not verified', success: false });

  const accessToken = signAccessToken({ userId: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ userId: user._id.toString() });

  user.refreshToken = refreshToken;
  user.lastLoginAt = new Date();
  await user.save();

  res.cookie("user", {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    isVerified: user.isVerified,
    profile: user.profile
  }, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
  });

  res.status(200).json({
    accessToken,
    refreshToken,
    success: true,
  });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.clearCookie("user");
    return res.status(400).json({ error: 'Missing refresh token', success: false });
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    res.clearCookie("user");
    return res.status(401).json({ error: 'Invalid or expired refresh token', success: false });
  }

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    res.clearCookie("user");
    return res.status(401).json({ error: 'Refresh token not recognized', success: false });
  }

  const newAccessToken = signAccessToken({ userId: user._id.toString(), role: user.role });
  const newRefreshToken = signRefreshToken({ userId: user._id.toString() });

  user.refreshToken = newRefreshToken; // rotate
  await user.save();
  res.cookie("user", {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    isVerified: user.isVerified,
    profile: user.profile
  }, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
  });
  res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken, success: true });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Missing token', success: false });
  try {
    const decoded = verifyEmailToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ error: 'Invalid token', success: false });
    if (user.isVerified) return res.status(200).json({ message: 'Email already verified', success: true });
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: 'Email verified successfully', success: true });
  } catch {
    return res.status(400).json({ error: 'Invalid or expired token', success: false });
  }
};

const requestPasswordReset = async (req, res) => {
  const { error, value } = requestResetSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email } = value;
  const user = await User.findOne({ email });
  // Always respond success to avoid user enumeration
  if (!user) return res.status(200).json({ message: 'If the email exists, a reset link has been sent' });

  const resetToken = signPasswordResetToken({ userId: user._id.toString() });
  const resetLink = `${process.env.CLIENT_BASE_URL}/reset-password?token=${resetToken}`;
  await sendEmail({ to: user.email, subject: 'Reset your password', html: resetEmailTemplate(resetLink) });

  res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
};

const resetPassword = async (req, res) => {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { token, newPassword } = value;

  let decoded;
  try {
    decoded = verifyResetToken(token);
  } catch {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const user = await User.findById(decoded.userId);
  if (!user) return res.status(400).json({ error: 'Invalid token' });

  user.password = await bcrypt.hash(newPassword, 12);
  // Invalidate refresh token on password change
  user.refreshToken = undefined;
  await user.save();

  res.status(200).json({ message: 'Password reset successful. Please log in again.' });
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Missing refresh token' });
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);
    if (user && user.refreshToken === refreshToken) {
      user.refreshToken = undefined;
      await user.save();
    }
    res.clearCookie("user");
    res.status(200).json({ message: 'Logged out' });
  } catch {
    res.status(200).json({ message: 'Logged out' });
  }
};

module.exports = {
  register,
  login,
  refresh,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  logout,
};
