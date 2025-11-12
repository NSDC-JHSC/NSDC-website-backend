const { object } = require('joi');
const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema(
    {
        poster: { types: String },
        tag: { type: String, enum: ['UPCOMING', 'PAST', "ONGOING"] },
        title: { types: String },
        date: { types: String },
        vanue: { types: String },
        desc: { types: String },
        addInfo: { types: String },
        link: { types: String },
        startDate : {type :Date},
        endDate : {type :Date},
        isProblemStatementAvailable: { type: Boolean, default: false },
        problemStatemt: [{ type: String }],
        startSubmission: { type: Boolean }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Hackathon', hackathonSchema);
