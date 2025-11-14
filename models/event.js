const { object } = require('joi');
const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema(
    {
        poster: { type: String },
        tag: { type: String, enum: ['UPCOMING', 'PAST', "ONGOING"] },
        title: { type: String },
        date: { type: String },
        vanue: { type: String },
        desc: { type: String },
        Agenda : [{type : String}],
        addInfo: [{ type: String }],
        link: { type: String },
        timing: {type : String},
        isProblemStatementAvailable: { type: Boolean, default: false },
        problemStatemt: [{ type: String }],
        startSubmission: { type: Boolean },
        ideaSubmitedBy : [{type:String}]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Hackathon', hackathonSchema);
