import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import requireRoles from '../middleware/roles.js';
import { 
    getAllEvents, 
    createEvent, 
    deleteEvent,
    // Team Handlers
    addCoreTeamMember, deleteCoreTeamMember,
    addSocialMediaTeamMember, deleteSocialMediaTeamMember,
    addTechTeamMember, deleteTechTeamMember,
    addDataScienceTeamMember, deleteDataScienceTeamMember,
    addMediaTeamMember, deleteMediaTeamMember,
    addContentTeamMember, deleteContentTeamMember,
    addManagementTeamMember, deleteManagementTeamMember,
    addCreativeTeamMember, deleteCreativeTeamMember,
    addCorporateMarketingTeamMember, deleteCorporateMarketingTeamMember
} from '../controllers/adminController.js';

import {
    getCoreTeam,
    getsocialMediaTeam,
    gettechTeam,
    getdataScienceTeam,
    getmediaTeam,
    getcontentTeam,
    getmanagementTeam,
    getcreativeTeam,
    getcorporateMarkettingAffairsTeam
} from '../controllers/openController.js';

// ============================================================
// MIDDLEWARE
// ============================================================
// Security enabled: Requires valid JWT and Admin role
router.use(auth);
router.use(requireRoles(['admin']));

// ============================================================
// EVENT MANAGEMENT
// ============================================================
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.delete('/events/:eventId', deleteEvent);

// ============================================================
// TEAM MANAGEMENT
// ============================================================

// Core Team
router.get('/coreTeam', getCoreTeam);
router.post('/coreTeam', addCoreTeamMember);
router.delete('/coreTeam/:memberId', deleteCoreTeamMember);

// Social Media Team
router.get('/socialMediaTeam', getsocialMediaTeam);
router.post('/socialMediaTeam', addSocialMediaTeamMember);
router.delete('/socialMediaTeam/:memberId', deleteSocialMediaTeamMember);

// Tech Team
router.get('/techTeam', gettechTeam);
router.post('/techTeam', addTechTeamMember);
router.delete('/techTeam/:memberId', deleteTechTeamMember);

// Data Science Team
router.get('/dataScienceTeam', getdataScienceTeam);
router.post('/dataScienceTeam', addDataScienceTeamMember);
router.delete('/dataScienceTeam/:memberId', deleteDataScienceTeamMember);

// Media Team
router.get('/mediaTeam', getmediaTeam);
router.post('/mediaTeam', addMediaTeamMember);
router.delete('/mediaTeam/:memberId', deleteMediaTeamMember);

// Content Team
router.get('/contentTeam', getcontentTeam);
router.post('/contentTeam', addContentTeamMember);
router.delete('/contentTeam/:memberId', deleteContentTeamMember);

// Management Team
router.get('/managementTeam', getmanagementTeam);
router.post('/managementTeam', addManagementTeamMember);
router.delete('/managementTeam/:memberId', deleteManagementTeamMember);

// Creative Team
router.get('/creativeTeam', getcreativeTeam);
router.post('/creativeTeam', addCreativeTeamMember);
router.delete('/creativeTeam/:memberId', deleteCreativeTeamMember);

// Corporate & Marketing
router.get('/corporateMarkettingAffairsTeam', getcorporateMarkettingAffairsTeam);
router.post('/corporateMarkettingAffairsTeam', addCorporateMarketingTeamMember);
router.delete('/corporateMarkettingAffairsTeam/:memberId', deleteCorporateMarketingTeamMember);

export default router;