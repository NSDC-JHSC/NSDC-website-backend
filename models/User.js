import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: "" }, // latest active refresh token
    lastLoginAt: { type: Date, default: null },
    profile: {
      name: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
      organisation: { type: String, default: '' },
      gender: { type: String, enum: ['Male', 'Female', "Rather not to say"], default: 'Rather not to say' },
      phone: { type: String },
      address: { type: String },
      nsdccoins: { type: Number, default: 0 },
      registeredEvents: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        title: { type: String },
        tag: { type: String, enum: ['UPCOMING', 'PAST', "ONGOING"] },
        venue: { type: String },
        date : {type : String}
      }],
      registeredHackathon: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
        title: { type: String },
        tag: { type: String, enum: ['UPCOMING', 'PAST', "ONGOING"] },
        venue: { type: String },
        teamId: { type: String },
        teamName: { type: String },
        isLead: { type: Boolean },
        members: { type: Number }
      }],
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
