import express from 'express';
// import { Readable } from 'stream';
// import multer from 'multer';
import auth from '../middleware/auth.js';
import requireRoles from '../middleware/roles.js';
import {
  getMe,
  updateMe,
  listUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import {
  getHackathonData,
  // submitHachathonPpt
} from '../controllers/eventController.js';

const router = express.Router();

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
router.post('/getHackathonDetails/:hackathonId', auth, getHackathonData);
// router.post('/uploadPresention', upload.single("file"), auth, submitHachathonPpt);

export default router;
