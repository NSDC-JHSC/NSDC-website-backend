const User = require("../models/User");
const Hackathon = require("../models/event")
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

const getHackathonData = async (req, res) => {

  try {
    const { hackathonId } = req.params;
    const user = req.cookies.user;

    const dbUser = await User.findById(user.id);

    if (!dbUser || !dbUser.profile) {
      return res.status(404).json({ error: "Profile not found", success: false });
    }


    // Step 1: Validate registration
    const registration = dbUser.profile.registeredHackathon.find(
      (h) => h.id?.toString() === hackathonId
    )

    if (!registration) {
      return res.status(400).json({ message: 'User not registered for this hackathon', success: false });
    }

    const teamId = registration.teamId;
    const teamName = registration.teamName;

    if (!teamId) {
      return res.status(400).json({ message: 'No other team member found', success: false });
    }

    // Step 2: Find all teammates with same hackathonId & teamId
    const teamMembers = await User.find({
      'registeredHackathon.id': hackathonId,
      'registeredHackathon.teamId': teamId
    }).select('name email profile.organisation registeredHackathon.isLead');

    // Step 3: Format member details
    const members = teamMembers.map(u => {
      const reg = u.registeredHackathon.find(h => h.id === hackathonId);
      return {
        name: u.name,
        email: u.email,
        org: u.profile.organisation,
        isLeader: reg?.isLeader,
      };
    });

    // Step 4: Fetch hackathon details
    const hackathonDetails = await Hackathon.findById(hackathonId);

    // Create final response
    const responseData = {
      hackathon: {
        id: hackathonDetails.id,
        title: hackathonDetails.title,
        date: hackathonDetails.date,
        vanue: hackathonDetails.vanue,
        desc: hackathonDetails.desc,
        Agenda: hackathonDetails.Agenda,
        addInfo: hackathonDetails.addInfo,
        link: hackathonDetails.link,
        timing: hackathonDetails.timing,
        isProblemStatementAvailable: hackathonDetails.isProblemStatementAvailable,
        problemStatemt: hackathonDetails.problemStatemt,
        startSubmission: hackathonDetails.startSubmission,
      },
      team: {
        hackathonId,
        teamId,
        teamName,
        members,
        totalMembers: registration.members
      }
    };

    res.status(200).json({ responseData, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message, success: false });
  }

};

const submitHachathonPpt = async (req, res) => {

  try {
    const user = req.cookies.user;
    const { file, hackathonDetails, teamDetails } = req.body;

    if (!user || !user.profile) {
      return res.status(404).json({ error: "Profile not found", success: false });
    }

    if (!file) {
      return res.status(404).json({ error: "File not Found", success: false });
    }

    const hackathon = await Hackathon.findById(hackathonDetails.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon not Found", success: false });

    const teamId = hackathon.ideaSubmitedBy.find(
      (id) => id === teamDetails.teamId
    )

    if (teamId) res.status(501).json({ error: "Presentation already submitted", success: false, presentationAlreadySumitted: true });

    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));
    formData.append("Hackathon Id", hackathon.id);
    formData.append("Hackathon Title", hackathon.title);
    formData.append("Team Id", teamDetails.teamId);
    formData.append("Team Name", teamDetails.teamName);
    formData.append("Submitted By", user.profile.name);
    formData.append("other Link", "");


    const response = await fetch("https://script.google.com/macros/s/AKfycbwbQHzFmT1zL3fJRXK5edy2vdzUqNm0zJyAHR9laGqx4r768zx5GDitQa4vI7Ky0F7O/exec", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    // Delete the temp file from uploads folder
    fs.unlinkSync(req.file.path);

    res.json(result);

  }

  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', err: err.message, success: false });
  }

}


module.exports = {
  getHackathonData,
  submitHachathonPpt
};
