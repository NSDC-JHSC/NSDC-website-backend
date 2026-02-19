import Joi from 'joi';
import mongoose  from 'mongoose';

const hackathonSchema = new mongoose.Schema(
    {
        poster: { type: String },
        tag: { type: String, enum: ['UPCOMING', 'PAST', "ONGOING"] },
        title: { type: String },
        date: { type: String },
        venue: { type: String },
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

export default mongoose.model('Hackathon', hackathonSchema);  
