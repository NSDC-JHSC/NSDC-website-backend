const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({}, { strict: false }), 'events');

const coreTeam = mongoose.model('coreTeam', new mongoose.Schema({}, { strict: false }), 'coreTeam');

const socialMediaTeam = mongoose.model('socialMediaTeam', new mongoose.Schema({}, { strict: false }), 'socialMediaTeam');

const techTeam = mongoose.model('techTeam', new mongoose.Schema({}, { strict: false }), 'techTeam');

const dataScienceTeam = mongoose.model('dataScienceTeam', new mongoose.Schema({}, { strict: false }), 'dataScienceTeam');

const mediaTeam = mongoose.model('mediaTeam', new mongoose.Schema({}, { strict: false }), 'mediaTeam');

const contentTeam = mongoose.model('contentTeam', new mongoose.Schema({}, { strict: false }), 'contentTeam');

const managementTeam = mongoose.model('managementTeam', new mongoose.Schema({}, { strict: false }), 'managementTeam');

const creativeTeam = mongoose.model('creativeTeam', new mongoose.Schema({}, { strict: false }), 'creativeTeam');

const corporateMarkettingAffairsTeam = mongoose.model('corporateMarkettingAffairsTeam', new mongoose.Schema({}, { strict: false }), 'corporateMarkettingAffairsTeam');

module.exports = { Event, coreTeam, socialMediaTeam, techTeam, dataScienceTeam, mediaTeam, contentTeam, managementTeam, creativeTeam, corporateMarkettingAffairsTeam };