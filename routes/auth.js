const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');
const {
  register,
  login,
  refresh,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  logout,
} = require('../controllers/authController');

// Auth routes
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', authLimiter, refresh);
router.post('/logout', authLimiter, logout);

// Email verification
router.get('/verify-email', verifyEmail);

// Password reset
router.post('/request-reset', authLimiter, requestPasswordReset);
router.post('/reset-password', authLimiter, resetPassword);

// Example of a verified-only protected route
router.get('/status', auth, (req, res) => {
  res.json({ authenticated: true, verified: req.user.isVerified, role: req.user.role });
});

module.exports = router;
