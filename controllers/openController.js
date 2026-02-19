import {
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
} from '../models/other.js';
import { messageSchema } from '../validation/messageValidation.js';
import { checkAndUpdateEventStatus } from '../utils/eventUtils.js';

export const getEvents = async (req, res) => {

    try {
        let events = await Event.find({});
        events = await checkAndUpdateEventStatus(events);
        res.status(200).json({ events, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getCoreTeam = async (req, res) => {

    try {
        const coreNsdcMemebers = await coreTeam.findOne({});
        res.status(200).json({ coreNsdcMemebers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getsocialMediaTeam = async (req, res) => {

    try {
        const socialMediaTeamMembers = await socialMediaTeam.findOne({});
        res.status(200).json({ socialMediaTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const gettechTeam = async (req, res) => {

    try {
        const techTeamMembers = await techTeam.findOne({});
        res.status(200).json({ techTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getdataScienceTeam = async (req, res) => {

    try {
        const dataScienceTeamMembers = await dataScienceTeam.findOne({});
        res.status(200).json({ dataScienceTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getmediaTeam = async (req, res) => {

    try {
        const mediaTeamMembers = await mediaTeam.findOne({});
        res.status(200).json({ mediaTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getcontentTeam = async (req, res) => {

    try {
        const contentTeamMembers = await contentTeam.findOne({});
        res.status(200).json({ contentTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getmanagementTeam = async (req, res) => {

    try {
        const managementTeamMembers = await managementTeam.findOne({});
        res.status(200).json({ managementTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getcreativeTeam = async (req, res) => {

    try {
        const creativeTeamMembers = await creativeTeam.findOne({});
        res.status(200).json({ creativeTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const getcorporateMarkettingAffairsTeam = async (req, res) => {

    try {
        const corporateMarkettingAffairsTeamMembers = await corporateMarkettingAffairsTeam.findOne({});
        res.status(200).json({ corporateMarkettingAffairsTeamMembers, success: true });
    }
    catch (err) {
        res.status(401).json({ error: err, success: false });
    }
};

export const collectMessage = async (req, res) => {
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
