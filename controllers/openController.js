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

    const events =  await Event.find({});
    res.status(200).json({ events });
};

const getCoreTeam = async (req, res) => {

    const coreNsdcMemebers =  await coreTeam.findOne({});
    res.status(200).json({ coreNsdcMemebers });
};

const getsocialMediaTeam = async (req, res) => {

    const socialMediaTeamMembers =  await socialMediaTeam.findOne({});
    res.status(200).json({ socialMediaTeamMembers });
};

const gettechTeam = async (req, res) => {

    const techTeamMembers =  await techTeam.findOne({});
    res.status(200).json({ techTeamMembers });
};

const getdataScienceTeam = async (req, res) => {

    const dataScienceTeamMembers =  await dataScienceTeam.findOne({});
    res.status(200).json({ dataScienceTeamMembers });
};

const getmediaTeam = async (req, res) => {

    const mediaTeamMembers =  await mediaTeam.findOne({});
    res.status(200).json({ mediaTeamMembers });
};

const getcontentTeam = async (req, res) => {

    const contentTeamMembers =  await contentTeam.findOne({});
    res.status(200).json({ contentTeamMembers });
};

const getmanagementTeam = async (req, res) => {

    const managementTeamMembers =  await managementTeam.findOne({});
    res.status(200).json({ managementTeamMembers });
};

const getcreativeTeam = async (req, res) => {

    const creativeTeamMembers =  await creativeTeam.findOne({});
    res.status(200).json({ creativeTeamMembers });
};

const getcorporateMarkettingAffairsTeam = async (req, res) => {

    const corporateMarkettingAffairsTeamMembers =  await corporateMarkettingAffairsTeam.findOne({});
    res.status(200).json({ corporateMarkettingAffairsTeamMembers });
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
