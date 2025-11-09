const {
    Event,
    coreTeam,
    socialMediaTeam,
    techTeam,
    dataScienceTeam,
    mediaTeam,
    contentTeam,
    managementTeam,
    creativeTeam,
    corporateMarkettingAffairsTeam
} = require('../models/other');

const getEvents = async (req, res) => {

    try{
    const events =  await Event.find({});
    res.status(200).json({ events, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getCoreTeam = async (req, res) => {

    try{
    const coreNsdcMemebers =  await coreTeam.findOne({});
    res.status(200).json({ coreNsdcMemebers , success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getsocialMediaTeam = async (req, res) => {

    try{
    const socialMediaTeamMembers =  await socialMediaTeam.findOne({});
    res.status(200).json({ socialMediaTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const gettechTeam = async (req, res) => {

    try{
    const techTeamMembers =  await techTeam.findOne({});
    res.status(200).json({ techTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getdataScienceTeam = async (req, res) => {

    try{
    const dataScienceTeamMembers =  await dataScienceTeam.findOne({});
    res.status(200).json({ dataScienceTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getmediaTeam = async (req, res) => {

    try{
    const mediaTeamMembers =  await mediaTeam.findOne({});
    res.status(200).json({ mediaTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getcontentTeam = async (req, res) => {

    try{
    const contentTeamMembers =  await contentTeam.findOne({});
    res.status(200).json({ contentTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getmanagementTeam = async (req, res) => {

    try{
    const managementTeamMembers =  await managementTeam.findOne({});
    res.status(200).json({ managementTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getcreativeTeam = async (req, res) => {

    try{
    const creativeTeamMembers =  await creativeTeam.findOne({});
    res.status(200).json({ creativeTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};

const getcorporateMarkettingAffairsTeam = async (req, res) => {

    try{
    const corporateMarkettingAffairsTeamMembers =  await corporateMarkettingAffairsTeam.findOne({});
    res.status(200).json({ corporateMarkettingAffairsTeamMembers, success: true });
    }
    catch(err){
        res.status(401).json({ error: err, success: false });
    }
};


module.exports = {
    getEvents,
    getCoreTeam,
    getsocialMediaTeam,
    gettechTeam,
    getdataScienceTeam,
    getmediaTeam,
    getcontentTeam,
    getmanagementTeam,
    getcreativeTeam,
    getcorporateMarkettingAffairsTeam
};
