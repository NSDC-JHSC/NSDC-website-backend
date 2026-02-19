import express from 'express';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
    getEvents,
    getCoreTeam,
    getsocialMediaTeam,
    gettechTeam,
    getdataScienceTeam,
    getmediaTeam,
    getcontentTeam,
    getmanagementTeam,
    getcreativeTeam,
    getcorporateMarkettingAffairsTeam,
    collectMessage
} from '../controllers/openController.js';

const router = express.Router();

router.get('/events', authLimiter, getEvents);


router.get('/coreTeam', authLimiter, getCoreTeam);
router.get('/socialMediaTeam', authLimiter, getsocialMediaTeam);
router.get('/creativeTeam', authLimiter, getcreativeTeam);
router.get('/corporateMarkettingAffairsTeam', authLimiter, getcorporateMarkettingAffairsTeam);
router.get('/dataScienceTeam', authLimiter, getdataScienceTeam);
router.get('/techTeam', authLimiter, gettechTeam);
router.get('/contentTeam', authLimiter, getcontentTeam);
router.get('/managementTeam', authLimiter, getmanagementTeam);
router.get('/mediaTeam', authLimiter, getmediaTeam);


router.post('/sendMessage', authLimiter, collectMessage);

export default router;
