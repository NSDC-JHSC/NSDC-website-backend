const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRoles = require('../middleware/roles');
const {
  getMe,
  updateMe,
  listUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { getHackathonData } = require('../controllers/eventController');

// Self profile
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);

// Admin panel
router.get('/', auth, requireRoles(['admin']), listUsers);
router.get('/:id', auth, requireRoles(['admin']), getUserById);
router.put('/:id/role', auth, requireRoles(['admin']), updateUserRole);
router.delete('/:id', auth, requireRoles(['admin']), deleteUser);

// Hackathone Page
router.get('/getHachathonDetails/:hackathonId', auth, getHackathonData );

module.exports = router;
