import mongoose from 'mongoose';
import User from '../models/User.js';

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

import { checkAndUpdateEventStatus } from '../utils/eventUtils.js';

const getAllEvents = async (req, res) => {
  try {
    const { tag } = req.query; // Filter by tag: UPCOMING, ONGOING, PAST
    
    const filter = tag ? { tag: tag.toUpperCase() } : {};
    let events = await Event.find(filter).sort({ createdAt: -1 });

    events = await checkAndUpdateEventStatus(events);
    
    if (tag) {
        events = events.filter(e => e.tag === tag.toUpperCase());
    }

    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};



const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


const createAddMemberHandler = (TeamModel) => async (req, res) => {
  try {
    const { name, role, image, linkedin, github, isLead } = req.body;
    
    
    const newMember = {
      _id: new mongoose.Types.ObjectId(),
      name,
      role,
      image,
      social: {
      linkedin,
      github
      }
    };

  
    const updateQuery = isLead 
      ? { $push: { leads: newMember } } 
      : { $push: { members: newMember } };

    const teamDoc = await TeamModel.findOneAndUpdate(
      {}, 
      updateQuery,
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      team: teamDoc
    });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const createDeleteMemberHandler = (TeamModel) => async (req, res) => {
  try {
    const { memberId } = req.params;

  
    let queryId = memberId;
    if (mongoose.Types.ObjectId.isValid(memberId)) {
      queryId = new mongoose.Types.ObjectId(memberId);
    }

    const teamDoc = await TeamModel.findOneAndUpdate(
      {},
      { 
        $pull: { 
          leads: { _id: queryId },
          members: { _id: queryId }
        } 
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully',
      team: teamDoc
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const addCoreTeamMember = createAddMemberHandler(coreTeam);
const deleteCoreTeamMember = createDeleteMemberHandler(coreTeam);

const addSocialMediaTeamMember = createAddMemberHandler(socialMediaTeam);
const deleteSocialMediaTeamMember = createDeleteMemberHandler(socialMediaTeam);

const addTechTeamMember = createAddMemberHandler(techTeam);
const deleteTechTeamMember = createDeleteMemberHandler(techTeam);

const addDataScienceTeamMember = createAddMemberHandler(dataScienceTeam);
const deleteDataScienceTeamMember = createDeleteMemberHandler(dataScienceTeam);

const addMediaTeamMember = createAddMemberHandler(mediaTeam);
const deleteMediaTeamMember = createDeleteMemberHandler(mediaTeam);

const addContentTeamMember = createAddMemberHandler(contentTeam);
const deleteContentTeamMember = createDeleteMemberHandler(contentTeam);

const addManagementTeamMember = createAddMemberHandler(managementTeam);
const deleteManagementTeamMember = createDeleteMemberHandler(managementTeam);

const addCreativeTeamMember = createAddMemberHandler(creativeTeam);
const deleteCreativeTeamMember = createDeleteMemberHandler(creativeTeam);

const addCorporateMarketingTeamMember = createAddMemberHandler(corporateMarkettingAffairsTeam);
const deleteCorporateMarketingTeamMember = createDeleteMemberHandler(corporateMarkettingAffairsTeam);


export {
  getAllEvents,
  createEvent,
  deleteEvent,

  addCoreTeamMember, deleteCoreTeamMember,
  addSocialMediaTeamMember, deleteSocialMediaTeamMember,
  addTechTeamMember, deleteTechTeamMember,
  addDataScienceTeamMember, deleteDataScienceTeamMember,
  addMediaTeamMember, deleteMediaTeamMember,
  addContentTeamMember, deleteContentTeamMember,
  addManagementTeamMember, deleteManagementTeamMember,
  addCreativeTeamMember, deleteCreativeTeamMember,
  addCorporateMarketingTeamMember, deleteCorporateMarketingTeamMember
};
