const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default:"" }, // latest active refresh token
    lastLoginAt: { type: Date , default: null },
    profile: {
      name: { type: String , default: ''},
      avatarUrl: { type: String , default: ''},
      organisation: { type: String , default: ''},
      gender: { type: String ,enum: ['Male', 'Female', "Rather not to say" ], default: 'Rather not to say'},
      phone: { type: String , default: ''},
      address: { type: String , default: ''},
      nsdccoins: { type: Number, default: 0 },
      registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null }], // example of additional field
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
