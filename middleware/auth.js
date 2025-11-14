const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      res.clearCookie("user");
      return res.status(401).json({ error: 'Missing access token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select('_id email role isVerified');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = { id: user._id.toString(), email: user.email, role: user.role, isVerified: user.isVerified };
    next();
  } catch (err) {
    res.clearCookie("user");
    return res.status(401).json({ error: 'Invalid or expired access token' });
  }
};
