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
const { messageSchema } = require('../validation/messageValidation');

const getEvents = async (req, res) => {

    try {
        const events = await Event.find({});
        res.status(200).json({ events, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getCoreTeam = async (req, res) => {

    try {
        const coreNsdcMemebers = await coreTeam.findOne({});
        res.status(200).json({ coreNsdcMemebers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getsocialMediaTeam = async (req, res) => {

    try {
        const socialMediaTeamMembers = await socialMediaTeam.findOne({});
        res.status(200).json({ socialMediaTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const gettechTeam = async (req, res) => {

    try {
        const techTeamMembers = await techTeam.findOne({});
        res.status(200).json({ techTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getdataScienceTeam = async (req, res) => {

    try {
        const dataScienceTeamMembers = await dataScienceTeam.findOne({});
        res.status(200).json({ dataScienceTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getmediaTeam = async (req, res) => {

    try {
        const mediaTeamMembers = await mediaTeam.findOne({});
        res.status(200).json({ mediaTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getcontentTeam = async (req, res) => {

    try {
        const contentTeamMembers = await contentTeam.findOne({});
        res.status(200).json({ contentTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getmanagementTeam = async (req, res) => {

    try {
        const managementTeamMembers = await managementTeam.findOne({});
        res.status(200).json({ managementTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getcreativeTeam = async (req, res) => {

    try {
        const creativeTeamMembers = await creativeTeam.findOne({});
        res.status(200).json({ creativeTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const getcorporateMarkettingAffairsTeam = async (req, res) => {

    try {
        const corporateMarkettingAffairsTeamMembers = await corporateMarkettingAffairsTeam.findOne({});
        res.status(200).json({ corporateMarkettingAffairsTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

const collectMessage = async (req, res) => {
    const { error, value } = messageSchema.validate(req.body);
    console.log(error);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const messageData = new URLSearchParams({
        "entry.1519099565": value.name,
        "entry.1988136105": value.email,
        "entry.1802197528": value.message
    }).toString();

    try {
        const response = await fetch(process.env.MESSAGE_FORM_LINK, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: messageData,
        });
        if (!response.ok) {
            res.status(501).json({ error: `Failed to send data. Status: ${response.status}`, success: false });
        }
        res.status(200).json({ message: "Data received successfully", success: true });
    }
    catch (err) {
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
    getcorporateMarkettingAffairsTeam,
    collectMessage
};
