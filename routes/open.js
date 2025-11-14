const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const {
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
} = require('../controllers/openController');

// Open routes
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


module.exports = router;
