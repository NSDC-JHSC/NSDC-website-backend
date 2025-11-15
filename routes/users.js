const express = require('express');
// const multer = require("multer");
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
const {
  getHackathonData,
  // submitHachathonPpt
} = require('../controllers/eventController');

// const upload = multer({ storage: multer.memoryStorage() });

// Self profile
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);

// Admin panel
router.get('/', auth, requireRoles(['admin']), listUsers);
router.get('/:id', auth, requireRoles(['admin']), getUserById);
router.put('/:id/role', auth, requireRoles(['admin']), updateUserRole);
router.delete('/:id', auth, requireRoles(['admin']), deleteUser);

// Hackathone Page
router.get('/getHachathonDetails/:hackathonId', auth, getHackathonData);
// router.post('/uploadPresention', upload.single("file"), auth, submitHachathonPpt);

module.exports = router;
