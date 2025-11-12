const User = require("../models/User");
const Hackathon = require("../models/event")

const getHackathonData = async (req, res) => {

  try {
    const { hackathonId } = req.params;
    const user = req.user;

    if (!user) return res.status(404).json({ error: 'User not found', success: false });

    const dbUser = await User.findById(user.id);

    // Step 1: Validate registration
    const registration = dbUser.registeredHackathon.find(
      (h) => h.hackathonId === hackathonId
    )

    if (!registration) {
      return res.status(400).json({ message: 'User not registered for this hackathon', success: false });
    }

    const teamId = registration.teamId;

    if (!teamId) {
      return res.status(400).json({ message: 'No other team member found', success: false });
    }

    // Step 2: Find all teammates with same hackathonId & teamId
    const teamMembers = await User.find({
      'registeredHackathon.hackathonId': hackathonId,
      'registeredHackathon.teamId': teamId
    }).select('name email profile.organisation registeredHackathon.isLead');

    // Step 3: Format member details
    const members = teamMembers.map(u => {
      const reg = u.registeredHackathons.find(h => h.hackathonId === hackathonId);
      return {
        name: u.name,
        email: u.email,
        org: u.profile.organisation,
        isLeader: reg?.isLeader,
      };
    });

    // Step 4: Fetch hackathon details
    const hackathon = await Hackathon.findOne({ hackathonId });

    // Create final response
    const responseData = {
      hackathon: {
        name: hackathon.name,
        title: hackathon.title,
        description: hackathon.desc,
        startDate: hackathon.startDate,
        endDate: hackathon.endDate,
        isProblemStatementAvailable: hackathon.isProblemStatementAvailable,
        problemStatemt : hackathon.problemStatemt,
        startSubmission : hackathon.startSubmission
      },
      team: {
        hackathonId,
        teamId,
        members,
        totalMembers : registration.members
      }
    };

    res.status(200).json({ responseData, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message, success : false });
  }

};


module.exports = {
  getHackathonData
};
