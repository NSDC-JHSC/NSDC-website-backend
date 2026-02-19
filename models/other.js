    import mongoose from 'mongoose';

export const Event = mongoose.model('Event', new mongoose.Schema({}, { strict: false }), 'events');

export const coreTeam = mongoose.model('coreTeam', new mongoose.Schema({}, { strict: false }), 'coreTeam');

export const socialMediaTeam = mongoose.model('socialMediaTeam', new mongoose.Schema({}, { strict: false }), 'socialMediaTeam');

export const techTeam = mongoose.model('techTeam', new mongoose.Schema({}, { strict: false }), 'techTeam');

export const dataScienceTeam = mongoose.model('dataScienceTeam', new mongoose.Schema({}, { strict: false }), 'dataScienceTeam');

export const mediaTeam = mongoose.model('mediaTeam', new mongoose.Schema({}, { strict: false }), 'mediaTeam');

export const contentTeam = mongoose.model('contentTeam', new mongoose.Schema({}, { strict: false }), 'contentTeam');

export const managementTeam = mongoose.model('managementTeam', new mongoose.Schema({}, { strict: false }), 'managementTeam');

export const creativeTeam = mongoose.model('creativeTeam', new mongoose.Schema({}, { strict: false }), 'creativeTeam');

export const corporateMarkettingAffairsTeam = mongoose.model('corporateMarkettingAffairsTeam', new mongoose.Schema({}, { strict: false }), 'corporateMarkettingAffairsTeam');

